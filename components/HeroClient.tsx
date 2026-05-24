'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowRight, Sparkles, BookOpen, Award } from 'lucide-react';

interface HeroData {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  image_url: string;
  show_badge?: boolean;
  badge_text?: string;
  card1_title?: string;
  card1_subtitle?: string;
  card2_title?: string;
  card2_subtitle?: string;
}

export default function HeroClient({ hero }: { hero: HeroData }) {
  // Helper to split title to highlight "Islami" if present, or just render it
  const titleParts = hero.title.split(/(Islami)/i);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-20 pb-16 px-4 md:px-20 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-primary">
        {hero.image_url && (
          <Image
            src={hero.image_url}
            alt="Madrasah Campus"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-primary/75 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-start space-y-8"
        >
          {hero.show_badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-secondary-container border border-secondary-container/30 shadow-lg shadow-gold/5">
              <Sparkles size={16} />
              <span className="font-sans font-bold text-xs uppercase tracking-wider">{hero.badge_text || 'PPDB 2026/2027 Dibuka'}</span>
            </div>
          )}

          <h1 className="font-serif font-bold text-4xl md:text-6xl text-white leading-tight drop-shadow-md">
            {titleParts.map((part, i) =>
              part.toLowerCase() === 'islami' ?
                <span key={i} className="text-gold">{part}</span> :
                <span key={i}>{part}</span>
            )}
          </h1>

          <p className="font-sans text-lg md:text-xl text-surface-variant/90 max-w-2xl drop-shadow-sm leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {hero.button_text && (
              <a href={hero.button_link || '#'} className="btn-primary-gradient text-white px-8 py-4 rounded-full font-sans font-bold flex items-center gap-2 group border-none">
                {hero.button_text}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            <button className="px-8 py-4 rounded-full font-sans font-bold text-white border border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm">
              Lihat Profil
            </button>
          </div>
        </motion.div>

        {/* Floating Hero Cards */}
        <div className="hidden lg:block lg:col-span-5 relative h-full min-h-[400px]">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-72 glass-panel p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg">{hero.card1_title || 'Kurikulum Integrasi'}</h3>
              <p className="font-sans text-sm text-surface-variant">{hero.card1_subtitle || 'Sains & Agama'}</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-20 w-64 glass-panel p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-primary font-bold">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg">{hero.card2_title || 'Akreditasi A'}</h3>
              <p className="font-sans text-sm text-surface-variant">{hero.card2_subtitle || 'Kualitas Terjamin'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
