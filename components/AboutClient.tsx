'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface AboutData {
  text: string;
  image_url: string;
}

export default function AboutClient({ data }: { data: AboutData }) {
  // Simple heuristic to split text into paragraphs
  const paragraphs = data.text ? data.text.split('\n\n') : [data.text];

  return (
    <section className="py-24 px-4 md:px-20 bg-surface-container-low overflow-hidden girih-pattern" id="profil">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Sejarah Singkat</h2>
              <div className="h-1.5 w-20 bg-gold rounded-full"></div>
            </div>
            
            <div className="space-y-6 font-sans text-on-surface-variant text-lg leading-relaxed whitespace-pre-wrap">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/40 aspect-[4/3] group bg-gray-100 flex items-center justify-center"
          >
            {data.image_url ? (
              <Image
                src={data.image_url}
                alt="Gedung Bersejarah"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
                unoptimized
              />
            ) : (
               <span className="text-gray-400">Tidak ada gambar</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
