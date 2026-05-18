'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Ubah endpoint mengarah ke API Register
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (res.ok) {
      // 2. Arahkan user untuk login setelah berhasil mendaftar
      setMessage("Akun berhasil dibuat! Silakan login.");
      setTimeout(() => router.push('/'), 1500); // Jeda 1.5 detik biar pesan terbaca
    } else {
      const data = await res.json();
      setMessage(data.error || "Gagal membuat akun");
    }
  };

  return (
    <div className="w-full flex flex-col shadow-2xl rounded-[24px] bg-transparent overflow-hidden">
      
      {/* 1. BAGIAN ATAS: Solid White (Area Form) */}
      <div className="bg-white px-8 pt-8 pb-4 relative z-10">
        {/* Ubah Judul */}
        <h3 className="text-center text-[15px] font-bold text-gray-900 mb-6">Create your account</h3>
        
        {/* Notifikasi Pesan (Bisa hijau kalau sukses, merah kalau error) */}
        {message && (
          <div className={`text-xs text-center mb-4 p-2 rounded ${message.includes('berhasil') ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Ubah Teks Tombol */}
          <button type="submit" className="w-full py-3.5 mt-6 bg-[#ccff00] text-black rounded-xl font-bold text-sm hover:bg-[#b3e600] transition-all">
            create account
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