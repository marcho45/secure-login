import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();

// 1. RATE LIMITER: Mencegah temanmu membombardir database dengan ribuan akun palsu (Spamming)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "5 m"), // Batasi hanya 3 pendaftaran per 5 menit per IP
});

export async function POST(req: Request) {
  try {
    // Cek Rate Limit berdasarkan IP
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Terlalu banyak mencoba mendaftar. Silakan tunggu beberapa saat." },
        { status: 429 }
      );
    }

    const { username, password } = await req.json();

    // 2. VALIDASI INPUT (Data Sanitization)
    // Mencegah pendaftaran dengan username/password kosong atau terlalu pendek
    if (!username || username.length < 4) {
      return NextResponse.json({ error: "Username minimal 4 karakter!" }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password minimal 8 karakter demi keamanan!" }, { status: 400 });
    }

    // 3. CEK USERNAME (Integritas Data)
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username sudah digunakan!" }, { status: 400 });
    }

    // 4. HASHING DENGAN SALT TINGGI (Confidentiality)
    // Kita gunakan salt round 12 (lebih berat dari default 10) untuk memperlambat proses peretasan password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. SIMPAN KE DATABASE (Aman dari SQL Injection via Prisma)
    await prisma.user.create({
      data: {
        username: username.trim(), // Trim untuk hapus spasi tak terlihat
        password: hashedPassword,
      }
    });

    return NextResponse.json({ message: "Registrasi berhasil!" }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem" }, { status: 500 });
  }
}