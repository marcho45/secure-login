import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Fungsi ini otomatis berjalan setiap kali ada yang klik login Google
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // 1. Ambil email dari Google untuk dijadikan username unik
          const googleEmail = user.email as string;

          // 2. Cek apakah username (email Google) ini sudah terdaftar di database
          const existingUser = await prisma.user.findUnique({
            where: { username: googleEmail },
          });

          // 3. Jika BELUM ADA, langsung masukkan (INSERT) data baru ke database
          if (!existingUser) {
            await prisma.user.create({
              data: {
                username: googleEmail,
                // Diisi string kosong karena login-nya pakai Google, bukan password manual
                password: "", 
              },
            });
            console.log(`User baru dari Google berhasil disimpan: ${googleEmail}`);
          }
        } catch (error) {
          console.error("Gagal menyimpan data user Google ke database:", error);
          return false; // Batalkan proses login jika database error
        }
      }
      return true; // Izinkan masuk ke dashboard jika semua aman
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };