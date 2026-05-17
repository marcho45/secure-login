import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();

// Konfigurasi Rate Limit: Maksimal 5 percobaan dalam 1 menit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';

export async function POST(req: Request) {
  try {
    // 1. CEK RATE LIMIT (Mencegah Brute-Force)
    // Identifikasi berdasarkan IP address pengguna
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan login. Silakan tunggu 1 menit." },
        { status: 429 } // Too Many Requests
      );
    }

    const { username, password } = await req.json();

    // 2. Cari user di database
    const user = await prisma.user.findUnique({
      where: { username }
    });

    // 3. Jika user tidak ada
    if (!user) {
      return NextResponse.json({ error: "Username atau password salah!" }, { status: 401 });
    }

    // 4. Bandingkan password (Hashing Verification)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Username atau password salah!" }, { status: 401 });
    }

    // 5. BUAT TOKEN JWT (Stateless Authentication)
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' } 
    );

    // 6. BUAT RESPONSE & SET COOKIE HTTP-ONLY
    const response = NextResponse.json(
      { message: "Login berhasil!", username: user.username }, 
      { status: 200 }
    );

    // Keamanan: HttpOnly mencegah token diakses via JavaScript (Anti-XSS)
    response.cookies.set('auth_token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600, 
      path: '/', 
      sameSite: 'strict', // Mencegah serangan CSRF
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}