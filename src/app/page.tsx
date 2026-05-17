'use client';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

const CAR_SLIDES = [
  { name: 'LOTUS GT 430', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070' },
  { name: 'CHEVROLET CAMARO', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070' },
  { name: 'MERCEDES BENZ AMG', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=2070' },
  { name: 'FERRARI 488', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070' },
  { name: 'BMW M4 COMP', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2070' },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CAR_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAR_SLIDES.length - 1 : prev - 1));
  };

  return (
    // overflow-y-auto agar di HP bisa di-scroll jika konten kepanjangan
    <main className="min-h-screen w-full bg-white font-sans p-4 lg:p-6 flex flex-col lg:flex-row gap-6 overflow-y-auto lg:overflow-hidden">
      
     {/* SISI KIRI: Teks & Create Account */}
<div className="flex-1 flex flex-col justify-between min-h-[600px] lg:min-h-0 py-8 lg:py-0">
  
  {/* Kontainer Teks Utama - Pakai flex-1 agar About Us terdorong ke bawah */}
  <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
    <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4 lg:mb-6 uppercase">
      Largest Image Source
    </p>
    
    <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.05] text-gray-900 relative z-10">
      POWERED BY <br />
      CREATORS AROUND <br />
      THE WORLD.
      <div className="absolute right-[10px] bottom-1 lg:bottom-4 flex -space-x-3 z-[-1]">
        <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#2d4026] opacity-90 mix-blend-multiply"></div>
        <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#52733b] opacity-90 mix-blend-multiply"></div>
        <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#ccff00] opacity-90 mix-blend-multiply"></div>
      </div>
    </h1>
    
    <div className="mt-8 lg:mt-12">
      <p className="text-gray-400 text-xs font-medium mb-2">Don't have an account?</p>
      <Link href="/register" className="inline-block font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5 text-sm hover:opacity-70 transition-opacity">
        Create account →
      </Link>
    </div>
  </div>

  {/* BAGIAN ABOUT US - Sekarang SELALU muncul dan rapi di bawah */}
  <div className="w-full bg-[#111111] rounded-[30px] p-6 lg:p-8 h-[160px] lg:h-[200px] relative overflow-hidden group flex items-end shrink-0 mt-8">
     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070')] bg-cover bg-center opacity-30 grayscale group-hover:opacity-50 transition-opacity duration-500"></div>
     <div className="relative z-10 flex gap-4 lg:gap-6 w-full items-end">
       <h3 className="text-white font-bold text-lg lg:text-xl min-w-[80px] lg:min-w-[100px] mb-1">About us</h3>
       <p className="text-gray-400 text-[10px] lg:text-xs leading-relaxed max-w-[300px]">
         Over <strong className="text-white">3 million</strong> free high-resolution images brought to you by the world's most generous community.
       </p>
     </div>
  </div>
</div>

      {/* SISI KANAN: Background Gambar & Login Box */}
      {/* min-h-[500px] agar di HP bagian ini tetap punya tinggi yang cukup */}
      <div 
        className="flex-1 min-h-[550px] lg:min-h-0 rounded-[30px] relative flex flex-col items-center justify-center bg-cover bg-center overflow-hidden transition-all duration-700 ease-in-out" 
        style={{ backgroundImage: `url("${CAR_SLIDES[currentIndex].img}")` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute top-8 lg:top-10 text-center w-full text-white z-10 px-4">
          <h2 className="tracking-[3px] text-[10px] lg:text-xs font-semibold uppercase">{CAR_SLIDES[currentIndex].name}</h2>
          <p className="text-[8px] lg:text-[9px] opacity-80 uppercase mt-1 tracking-wider">Best cars</p>
        </div>

        <div className="w-full max-w-[320px] lg:max-w-[360px] z-10 px-4">
          <LoginForm />
        </div>

        <div className="absolute bottom-8 lg:bottom-10 left-6 lg:left-10 text-white text-[10px] lg:text-xs font-medium z-10">
          0{currentIndex + 1} / 05
        </div>
        
        <div className="absolute bottom-8 lg:bottom-10 right-6 lg:right-10 flex gap-2 z-10">
          <button onClick={prevSlide} className="w-8 h-8 rounded-lg border border-white/40 flex items-center justify-center text-white hover:bg-white/20 backdrop-blur-sm transition-all active:scale-90">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={nextSlide} className="w-8 h-8 rounded-lg border border-white/40 flex items-center justify-center text-white hover:bg-white/20 backdrop-blur-sm transition-all active:scale-90">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </main>
  );
}