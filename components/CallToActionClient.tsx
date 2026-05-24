'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export function CallToActionClient() {
  return (
    <section className="py-24 px-4 md:px-20 bg-gradient-to-br from-primary-container to-[#064e3b] text-white text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto space-y-10"
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold">Bergabung Bersama Kami</h2>
        <p className="font-sans text-xl opacity-90 leading-relaxed">
          Jadilah bagian dari generasi unggul yang siap menghadapi masa depan dengan bekal ilmu pengetahuan yang mumpuni dan keluhuran akhlak yang kokoh.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button className="px-10 py-4 bg-white text-primary font-sans font-bold rounded-full hover:bg-surface-variant transition-all shadow-xl shadow-black/20 hover:-translate-y-1">
            Informasi Pendaftaran
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-gold text-gold font-sans font-bold rounded-full hover:bg-gold/10 transition-all">
            Jadwalkan Kunjungan
          </button>
        </div>
      </motion.div>
    </section>
  );
}
