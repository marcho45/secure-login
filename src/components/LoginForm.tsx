'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk mata
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
    // BUNGKUS UTAMA
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
            
            {/* --- BAGIAN INPUT PASSWORD & TOMBOL MATA --- */}
            <div className="relative w-full flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none font-black text-sm text-gray-900 tracking-widest pr-8"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 text-gray-400 hover:text-gray-900 transition-colors"
              >
                {showPassword ? (
                  // Ikon Mata Silang (Sembunyikan) - Pakai Raw SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                ) : (
                  // Ikon Mata Terbuka (Lihat) - Pakai Raw SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {/* ------------------------------------------- */}
            
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

      {/* 2. BAGIAN BAWAH: Jendela Tembus Pandang */}
      <div className="relative h-32 w-full overflow-hidden bg-transparent">
         <div className="absolute top-2 left-6 right-6 bottom-6 rounded-[20px] shadow-[0_0_0_999px_white]"></div>
         <div className="absolute top-2 left-6 right-6 bottom-6 rounded-[20px] border border-black/5 shadow-[inset_0_2px_15px_rgba(0,0,0,0.15)] pointer-events-none"></div>
      </div>

    </div>
  );
}