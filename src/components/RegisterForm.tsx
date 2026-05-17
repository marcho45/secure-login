'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State untuk mengontrol pesan dan status (sukses/gagal)
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); 
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset pesan setiap kali tombol diklik
    setMessage('');
    setIsSuccess(false);

    if (password !== confirmPassword) {
      setMessage("Password tidak cocok!");
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (res.ok) {
      // Ubah status menjadi sukses dan tampilkan pesan
      setIsSuccess(true);
      setMessage("Registrasi berhasil! Mengalihkan ke login...");
      
      // Beri jeda 2 detik sebelum pindah halaman agar user bisa membaca notifikasinya
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      const data = await res.json();
      setIsSuccess(false);
      setMessage(data.error || "Registrasi gagal");
    }
  };

  return (
    <div className="w-full flex flex-col shadow-2xl rounded-[24px] bg-transparent overflow-hidden">
      
      {/* 1. AREA FORM (PUTIH SOLID) */}
      <div className="bg-white px-8 pt-8 pb-5 relative z-10">
        <h3 className="text-center text-[15px] font-bold text-gray-900 mb-6">Create an Account</h3>
        
        {/* AREA NOTIFIKASI DINAMIS */}
        {message && (
          <div className={`text-xs text-center mb-4 p-2.5 rounded font-medium border ${
            isSuccess 
              ? 'bg-green-50 text-green-600 border-green-200' // Styling jika sukses (Hijau)
              : 'bg-red-50 text-red-500 border-red-100'       // Styling jika gagal (Merah)
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="border-b border-gray-100 pb-1 focus-within:border-gray-400 transition-colors">
            <label className="block text-[10px] text-gray-400 font-semibold mb-1">NAME / USERNAME</label>
            <input 
              type="text" 
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-transparent outline-none font-bold text-sm text-gray-900"
              placeholder="Username"
            />
          </div>

          <div className="border-b border-gray-100 pb-1 focus-within:border-gray-400 transition-colors">
            <label className="block text-[10px] text-gray-400 font-semibold mb-1">PASSWORD</label>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none font-black text-sm text-gray-900 tracking-widest"
              placeholder="••••••••••"
            />
          </div>

          <div className="border-b border-gray-100 pb-1 focus-within:border-gray-400 transition-colors">
            <label className="block text-[10px] text-gray-400 font-semibold mb-1">CONFIRM PASSWORD</label>
            <input 
              type="password" 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none font-black text-sm text-gray-900 tracking-widest"
              placeholder="••••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            // Jika sukses, tombol otomatis disabled agar user tidak klik 2x
            disabled={isSuccess}
            className={`w-full py-4 mt-2 rounded-xl font-bold uppercase text-xs tracking-widest transition-all active:scale-95 ${
              isSuccess 
                ? 'bg-green-500 text-white cursor-not-allowed' // Berubah hijau saat loading pindah halaman
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSuccess ? 'SUCCESS...' : 'Register'}
          </button>
        </form>
      </div>

      {/* 2. AREA BOLONG (TEMBUS PANDANG) */}
      <div className="relative h-28 w-full overflow-hidden bg-transparent">
         <div className="absolute top-2 left-6 right-6 bottom-6 rounded-[20px] shadow-[0_0_0_999px_white]"></div>
         <div className="absolute top-2 left-6 right-6 bottom-6 rounded-[20px] border border-black/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none"></div>
      </div>

    </div>
  );
}