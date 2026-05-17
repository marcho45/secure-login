'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setMessage(data.error || "Login gagal");
    }
  };

  return (
    // BUNGKUS UTAMA: Background transparan & overflow-hidden agar bentuk lengkung utamanya terjaga
    <div className="w-full flex flex-col shadow-2xl rounded-[24px] bg-transparent overflow-hidden">
      
      {/* 1. BAGIAN ATAS: Solid White (Area Form) */}
      <div className="bg-white px-8 pt-8 pb-4 relative z-10">
        <h3 className="text-center text-[15px] font-bold text-gray-900 mb-6">Login to your account</h3>
        
        {message && <div className="text-red-500 text-xs text-center mb-4 bg-red-50 p-2 rounded">{message}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="border-b border-gray-100 pb-1">
            <label className="block text-[10px] text-gray-400 font-semibold mb-1">Username</label>
            <input 
              type="text" 
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-transparent outline-none font-bold text-sm text-gray-900"
              placeholder="Rassya Lucas"
            />
          </div>

          <div className="border-b border-gray-100 pb-1">
            <label className="block text-[10px] text-gray-400 font-semibold mb-1">Password</label>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none font-black text-sm text-gray-900 tracking-widest"
              placeholder="••••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between text-[11px] pt-1">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
              <input type="checkbox" className="w-4 h-4 appearance-none border border-gray-300 rounded-sm checked:bg-[#ccff00] checked:border-transparent transition-colors relative after:content-[''] checked:after:absolute checked:after:left-1 checked:after:top-0.5 checked:after:w-1.5 checked:after:h-2.5 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-black checked:after:rotate-45" />
              Remember me
            </label>
            <a href="#" className="text-gray-400 font-medium hover:text-gray-900">Forgot your password?</a>
          </div>
          
          <button type="submit" className="w-full py-3.5 mt-2 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all">
            login
          </button>
        </form>
      </div>

      {/* 2. BAGIAN BAWAH: Jendela Tembus Pandang yang Sempurna */}
      <div className="relative h-32 w-full overflow-hidden bg-transparent">
         {/* Trik CSS: Kotak bolong dengan bayangan putih raksasa yang menyebar keluar */}
         <div className="absolute top-2 left-6 right-6 bottom-6 rounded-[20px] shadow-[0_0_0_999px_white]"></div>
         
         {/* Efek border & shadow dalam (inner shadow) supaya lubangnya terlihat 3D dan lebih manis */}
         <div className="absolute top-2 left-6 right-6 bottom-6 rounded-[20px] border border-black/5 shadow-[inset_0_2px_15px_rgba(0,0,0,0.15)] pointer-events-none"></div>
      </div>

    </div>
  );
}