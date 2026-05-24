'use client';

import { motion } from 'motion/react';
import { Users, GraduationCap, Trophy, Ghost } from 'lucide-react';

const stats = [
  { label: 'Siswa Aktif', value: '850+', icon: Users, color: 'text-gold' },
  { label: 'Guru Profesional', value: '65+', icon: GraduationCap, color: 'text-primary' },
  { label: 'Prestasi Meraih', value: '120+', icon: Trophy, color: 'text-gold' },
  { label: 'Ekstrakurikuler', value: '15', icon: GraduationCap, color: 'text-primary' },
];

export default function Stats() {
  return (
    <section className="py-20 px-4 md:px-20 bg-surface relative z-10 -mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform"
            >
              <div className={`w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white ${stat.color}`}>
                 <stat.icon size={28} />
              </div>
              <span className={`font-serif text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</span>
              <span className="font-sans font-bold text-[10px] md:text-xs text-on-surface-variant uppercase tracking-widest leading-none">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
