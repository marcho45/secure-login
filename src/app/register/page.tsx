'use client';
import { useState } from 'react';
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';

const CAR_SLIDES = [
  { name: 'PORSCHE PANAMERA', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070' },
  { name: 'CHEVROLET CAMARO', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070' },
  { name: 'MERCEDES BENZ AMG', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=2070' },
  { name: 'FERRARI 488', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070' },
  { name: 'BMW M4 COMP', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2070' },
];

export default function RegisterPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CAR_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAR_SLIDES.length - 1 : prev - 1));
  };

  return (
    <main className="min-h-screen w-full bg-white font-sans flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* SISI KIRI: Teks Join the Club */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-16 px-8 md:px-16 lg:px-24 relative">
        <div className="flex flex-col items-start text-left max-w-lg mx-auto lg:mx-0">
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4 lg:mb-6 uppercase">
            Join the Club
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] text-gray-900 relative z-10 uppercase">
            Start Your <br />
            Journey With <br />
            Us Today.
            <div className="hidden md:flex absolute right-[-20px] bottom-2 flex -space-x-3 z-[-1]">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#2d4026] opacity-90 mix-blend-multiply"></div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#52733b] opacity-90 mix-blend-multiply"></div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#ccff00] opacity-90 mix-blend-multiply"></div>
            </div>
          </h1>
          
          <div className="mt-8 lg:mt-12">
            <p className="text-gray-400 text-xs font-medium mb-2">Already have an account?</p>
            <Link href="/" className="inline-block font-bold text-gray-900 border-b-2 border-gray-900 pb-0.5 text-sm hover:opacity-70 transition-opacity">
              Login to account →
            </Link>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Background Slider & Register Box */}
      <div 
        className="w-full lg:w-1/2 min-h-[600px] lg:h-screen relative flex flex-col items-center justify-center bg-cover bg-center overflow-hidden transition-all duration-700 ease-in-out" 
        style={{ backgroundImage: `url("${CAR_SLIDES[currentIndex].img}")` }}
      >
        <div className="absolute inset-0 bg-black/30 lg:bg-black/20"></div>

        <div className="absolute top-10 text-center w-full text-white z-10 px-4">
          <h2 className="tracking-[3px] text-[10px] lg:text-xs font-semibold uppercase">{CAR_SLIDES[currentIndex].name}</h2>
          <p className="text-[8px] lg:text-[9px] opacity-80 uppercase mt-1 tracking-wider">Best cars</p>
        </div>

        <div className="w-full max-w-[340px] md:max-w-[380px] z-10 px-4">
          <RegisterForm />
        </div>

        <div className="absolute bottom-10 left-8 lg:left-10 text-white text-[10px] lg:text-xs font-medium opacity-90 z-10 font-mono">
          0{currentIndex + 1} / 05
        </div>

        <div className="absolute bottom-10 right-8 lg:right-10 flex gap-2 z-10">
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