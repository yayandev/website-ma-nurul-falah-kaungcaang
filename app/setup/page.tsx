import Link from 'next/link';

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 girih-pattern">
      <div className="max-w-md w-full glass-panel p-8 md:p-10 rounded-3xl text-center space-y-6 shadow-2xl relative z-10 border border-outline-variant/30">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl text-primary font-bold">🛠️</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary font-serif">Setup Required</h1>
        <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
          Website ini sedang dalam tahap konfigurasi awal. Informasi sekolah belum lengkap atau belum diisi.
        </p>
        <p className="text-xs text-on-surface-variant/70 italic text-center pb-4">
          Jika Anda adalah administrator website ini, silakan login ke dasbor untuk mengatur identitas madrasah melalui menu Pengaturan Situs (Settings).
        </p>
        <Link 
          href="/admin/login" 
          className="inline-flex justify-center w-full rounded-full border border-transparent bg-primary py-3 px-4 text-sm font-bold text-white shadow-lg hover:bg-primary-container transition-all"
        >
          Masuk sebagai Administrator
        </Link>
      </div>
    </div>
  );
}
