import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import About from '@/components/About';
import VisiMisi from '@/components/VisiMisi';
import Image from 'next/image';
import { Award, Target, Users } from 'lucide-react';

const coreValues = [
  {
    title: 'KeIslaman',
    desc: 'Menanamkan nilai-nilai tauhid dan akhlak mulia dalam setiap aspek kehidupan sehari-hari.',
    icon: Target,
  },
  {
    title: 'Keunggulan',
    desc: 'Mendorong pencapaian prestasi akademik dan non-akademik di tingkat nasional maupun internasional.',
    icon: Award,
  },
  {
    title: 'Kebersamaan',
    desc: 'Membangun ukhuwah islamiyah dan lingkungan belajar yang inklusif serta saling mendukung.',
    icon: Users,
  },
];

import { createClient } from '@/lib/supabase/server';
import { enforceSetup } from '@/lib/setup';

export default async function ProfilPage() {
  await enforceSetup();
  const supabase = await createClient();
  const { data: profil } = await supabase.from('profil_madrasah').select('*').limit(1).single();

  const kepsekName = profil?.kepsek_name || 'Dr. H. Ahmad Mujtaba, M.Pd.';
  const kepsekMessage = profil?.kepsek_message || 'Selamat datang di Madrasah Aliyah Nurul Falah. Kami berkomitmen penuh untuk memfasilitasi setiap siswa dalam menggali potensi terbaik mereka. Dengan perpaduan ilmu agama yang mendalam dan penguasaan teknologi mutakhir, kami yakin lulusan kami akan mampu menjadi agen perubahan positif di masyarakat luas.';
  const kepsekImage = profil?.kepsek_image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw4ukOK7F9VNBMqpxXIdz7soXI2ujuPY3z-MGTHzJhHbhfglFAQ1xyPQhV9tiWrd40Ll6EuOONiGhbPbMpnVRkcBAqT-B7vx4gsh3ozmn6wczPtzzHyXko6vkLV51K-lUq-7zfZSMsxQ22a3VdPl_RpyXk9b8EotBKSePFWPsxrWT2umxOwx2rARDWwA1CHAWQ9gDoG05033FziI-1NAG88cN2RWwtMrxVrGawXgAHC5ZmvT0zQvJe4bgKg2XBKqj64K5USk9pzZw';
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-20 girih-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto space-y-6 text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 font-sans font-bold text-primary uppercase tracking-[0.1em] text-xs">
            Tentang Kami
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary font-bold">Profil Madrasah</h1>
          <p className="font-sans text-on-surface-variant text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Mengenal lebih dekat institusi pendidikan yang memadukan keagungan tradisi keilmuan Islam dengan inovasi teknologi masa depan.
          </p>
        </div>
      </section>

      <About />
      <VisiMisi />

      {/* Nilai-Nilai Inti */}
      <section className="py-24 px-4 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Nilai-Nilai Inti</h2>
            <div className="h-1.5 w-24 bg-gold mx-auto rounded-full"></div>
            <p className="font-sans text-on-surface-variant max-w-2xl mx-auto text-lg">
              Prinsip yang menjadi landasan kami dalam mendidik generasi penerus bangsa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/30 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="font-serif text-2xl text-primary font-bold mb-4">{value.title}</h3>
                <p className="font-sans text-on-surface-variant leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Madrasah */}
      <section className="py-24 px-4 md:px-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-8 md:p-16 rounded-[3rem] border border-outline-variant/30 flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-8 border-surface-container shadow-xl mx-auto md:mx-0">
               <Image 
                src={kepsekImage} 
                alt={kepsekName} 
                fill 
                className="object-cover object-top"
                referrerPolicy="no-referrer"
                unoptimized
               />
            </div>
            <div className="space-y-6 text-center md:text-left">
               <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold">Sambutan Kepala Madrasah</h2>
               <div className="h-1 w-16 bg-gold mx-auto md:mx-0 rounded-full"></div>
               <p className="font-serif italic text-xl text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                 &ldquo;{kepsekMessage}&rdquo;
               </p>
               <div>
                  <h4 className="font-sans font-bold text-primary text-lg">{kepsekName}</h4>
                  <p className="font-sans text-on-surface-variant">Kepala Madrasah Aliyah Nurul Falah</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
