'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
          
          {/* Tombol Login Biasa */}
          <button type="submit" className="w-full py-3 mt-2 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all">
            login
          </button>

          {/* Garis Pembatas OR */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Tombol Google Auth (Teks: Sign in) */}
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Sign in with Google
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