'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Bpk. Ahmad Fauzi',
    role: 'Wali Murid Kelas 12',
    text: 'Fasilitas lengkap dan guru-guru yang sangat kompeten. Anak saya tidak hanya unggul di bidang akademik sains, tetapi hafalan Qur\'annya juga sangat memuaskan.',
    initial: 'B',
  },
  {
    name: 'Siti Aisyah',
    role: 'Alumni Angkatan 2023',
    text: 'Lingkungan belajar yang sangat mendukung. Program kepemimpinan benar-benar membentuk karakter saya menjadi lebih berani dan bertanggung jawab.',
    initial: 'S',
  },
  {
    name: 'Dr. Hidayat',
    role: 'Tokoh Masyarakat / Akademisi',
    text: 'Keseimbangan antara ilmu dunia dan akhirat sangat terasa di sini. Integrasi teknologi dalam pembelajaran agama membuatnya relevan dengan zaman.',
    initial: 'D',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-20 bg-primary relative overflow-hidden text-white group/section">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-full bg-gold rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-full bg-primary-container rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Apa Kata Mereka?</h2>
          <p className="font-sans text-primary-fixed-dim max-w-xl mx-auto text-lg leading-relaxed opacity-80">
            Pengalaman nyata dari para siswa, orang tua, dan alumni Madrasah Nurul Falah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel bg-white/5 border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group"
            >
              <div className="flex text-gold mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={20} fill="#d4af37" />
                ))}
              </div>
              <p className="font-serif text-xl italic mb-8 leading-relaxed text-white/90">
                &ldquo;{rev.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-serif font-bold text-lg border border-white/20">
                  {rev.initial}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white leading-none mb-1">{rev.name}</h4>
                  <p className="font-sans text-xs text-primary-fixed font-medium opacity-70 uppercase tracking-widest">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
