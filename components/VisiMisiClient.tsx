'use client';

import { motion } from 'motion/react';
import { Eye, Flag, CheckCircle2 } from 'lucide-react';

interface VisiMisiData {
  visi: string;
  misi: string[];
}

export default function VisiMisiClient({ data }: { data: VisiMisiData }) {
  return (
    <section className="py-24 px-4 md:px-20 bg-surface relative girih-pattern">
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-[2px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Visi & Misi</h2>
          <p className="font-sans text-on-surface-variant max-w-xl mx-auto text-lg leading-relaxed">
            Komitmen kami untuk mencetak pemimpin masa depan dengan karakter Islami yang kokoh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visi Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-panel rounded-3xl p-10 relative overflow-hidden flex flex-col justify-center border-white/50"
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-4 text-gold mb-8">
               <Eye size={36} />
               <h3 className="font-serif text-3xl font-bold">Visi</h3>
            </div>
            <p className="font-serif text-2xl md:text-3xl text-primary italic leading-tight">
              &ldquo;{data.visi}&rdquo;
            </p>
          </motion.div>

          {/* Misi List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-10 border-white/50"
          >
            <div className="flex items-center gap-4 text-primary mb-10">
               <Flag size={36} className="text-gold" />
               <h3 className="font-serif text-3xl font-bold">Misi</h3>
            </div>
            <div className="space-y-6">
              {data.misi && data.misi.length > 0 ? data.misi.map((m, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 text-primary shrink-0 opacity-80">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="font-sans text-on-surface-variant text-lg leading-relaxed">
                    {m}
                  </p>
                </div>
              )) : (
                <p className="text-gray-500 italic">Misi belum ditentukan.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
