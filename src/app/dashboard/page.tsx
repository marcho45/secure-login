import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full bg-[#f4f4f4] flex items-center justify-center font-sans p-6">
      
      {/* Kotak Putih Tengah */}
      <div className="bg-white p-8 md:p-10 lg:p-14 rounded-[30px] shadow-xl md:shadow-2xl max-w-md w-full text-center flex flex-col items-center">
        
        {/* Ikon Ceklis Hijau */}
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#ccff00] rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Teks Sukses */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase tracking-tight">
          Login Success!
        </h1>
        <p className="text-gray-500 text-xs md:text-sm mb-8 md:mb-10 leading-relaxed px-2 md:px-4">
          Welcome back to the club. You have successfully authenticated into the system.
        </p>

        {/* Tombol Back to Home */}
        <Link 
          href="/" 
          className="w-full py-3 md:py-4 bg-black text-white rounded-xl font-bold uppercase text-[10px] md:text-sm tracking-widest hover:bg-gray-800 transition-all active:scale-95 block"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}