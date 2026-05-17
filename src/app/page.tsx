'use client'; // Wajib ada agar tombol bisa diklik dan state berjalan
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

// Daftar 5 mobil dan fotonya
const CAR_SLIDES = [
  { name: 'LOTUS GT 430', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070' },
  { name: 'CHEVROLET CAMARO', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070' },
  { name: 'MERCEDES BENZ AMG', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=2070' },
  { name: 'FERRARI 488', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070' },
  { name: 'BMW M4 COMP', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2070' },
];

export default function HomePage() {
  // State untuk melacak foto nomor berapa yang sedang aktif (mulai dari 0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi saat tombol Kanan (Next) diklik
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CAR_SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Fungsi saat tombol Kiri (Prev) diklik
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAR_SLIDES.length - 1 : prev - 1));
  };

  return (
    // Membungkus layar penuh dengan sedikit padding (p-4 lg:p-6) agar tidak terlalu menempel ke tepi monitor
    <main className="h-screen w-screen bg-white font-sans overflow-hidden p-4 lg:p-6 flex gap-6">
      
      {/* SISI KIRI: Teks & Create Account */}
      <div className="flex-1 flex flex-col justify-between relative">
        
        {/* Bagian Tengah: Heading (Di-center secara vertikal & horizontal) */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-6 uppercase">
            Largest Image Source
          </p>
          
          <h1 className="text-5xl lg:text-[64px] font-black leading-[1.05] text-gray-900 relative z-10">
            POWERED BY <br />
            CREATORS AROUND <br />
            THE WORLD.
            {/* 3 Lingkaran Hijau - Disesuaikan letaknya & ukurannya */}
            <div className="absolute right-[20px] lg:right-[10px] bottom-2 lg:bottom-4 flex -space-x-3 z-[-1]">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#2d4026] opacity-90 mix-blend-multiply"></div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#52733b] opacity-90 mix-blend-multiply"></div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ccff00] opacity-90 mix-blend-multiply"></div>
            </div>
          </h1>
          
          <div className="mt-12">
            <p className="text-gray-400 text-xs font-medium mb-2">Don't have an account?</p>
            <Link href="/register" className="inline-block font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5 text-sm hover:opacity-70 transition-opacity">
              Create account →
            </Link>
          </div>
        </div>

        {/* Bagian Bawah Kiri: Black Card About Us */}
        {/* Diberi margin horizontal (mx) agar sejajar rapi dengan teks di atasnya */}
        <div className="bg-[#111111] rounded-[30px] p-8 h-[200px] relative overflow-hidden group flex items-end shrink-0 mx-2 lg:mx-8 mb-2">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070')] bg-cover bg-center opacity-30 grayscale group-hover:opacity-50 transition-opacity duration-500"></div>
           <div className="relative z-10 flex gap-6 w-full items-end">
             <h3 className="text-white font-bold text-xl min-w-[100px] mb-1">About us</h3>
             <p className="text-gray-400 text-xs leading-relaxed max-w-[300px]">
               Over <strong className="text-white">3 million</strong> free <strong className="text-white">high-resolution images</strong> brought to you by the world's most generous community of <strong className="text-white border-b border-white pb-0.5">photographers.</strong>
             </p>
           </div>
        </div>
      </div>

      {/* SISI KANAN: Background Gambar Dinamis & Kotak Login */}
      <div 
        className="flex-1 rounded-[30px] relative flex flex-col items-center justify-center bg-cover bg-center overflow-hidden transition-all duration-700 ease-in-out" 
        style={{ backgroundImage: `url("${CAR_SLIDES[currentIndex].img}")` }}
      >
        {/* Overlay hitam tipis agar form dan tulisan putih selalu jelas terbaca di atas background */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Header Gambar Kanan (Judul Mobil Dinamis) */}
        <div className="absolute top-10 text-center w-full text-white z-10">
          <h2 className="tracking-[3px] text-xs font-semibold uppercase">{CAR_SLIDES[currentIndex].name}</h2>
          <p className="text-[9px] opacity-80 uppercase mt-1 tracking-wider">Best cars</p>
        </div>

        {/* KOMPONEN LOGIN KOTAK PUTIH */}
        <div className="w-full max-w-[360px] z-10">
          <LoginForm />
        </div>

        {/* Footer Gambar Kanan (Slide indicator dinamis) */}
        <div className="absolute bottom-10 left-10 text-white text-xs font-medium opacity-90 z-10">
          0{currentIndex + 1} / 05
        </div>
        
        {/* Tombol Interaktif Slider */}
        <div className="absolute bottom-10 right-10 flex gap-2 z-10">
          <button onClick={prevSlide} className="w-8 h-8 rounded-lg border border-white/40 flex items-center justify-center text-white hover:bg-white/20 backdrop-blur-sm transition-all active:scale-90 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={nextSlide} className="w-8 h-8 rounded-lg border border-white/40 flex items-center justify-center text-white hover:bg-white/20 backdrop-blur-sm transition-all active:scale-90 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

    </main>
  );
}