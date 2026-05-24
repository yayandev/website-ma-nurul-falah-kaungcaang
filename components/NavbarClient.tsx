'use client';

import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarClientProps {
  siteName: string;
  logoUrl: string | null;
}

export default function NavbarClient({ siteName, logoUrl }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Akademik', href: '/#akademik' },
    { name: 'Prestasi', href: '/#prestasi' },
    { name: 'Berita', href: '/berita' },
    { name: 'Kontak', href: '/#kontak' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-6'}`}>
      <div className={`flex items-center justify-between w-full max-w-7xl px-6 py-3 glass-panel rounded-full transition-all duration-500 ${isScrolled ? 'bg-white/80 shadow-lg' : 'bg-white/40'}`}>
        <a href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-lg flex-shrink-0">
            {logoUrl ? (
              <Image src={logoUrl} alt={siteName} fill className="object-contain" unoptimized />
            ) : (
              <div className="absolute inset-0 bg-primary flex items-center justify-center text-white font-serif font-bold text-lg">
                {siteName.charAt(0)}
              </div>
            )}
          </div>
          <span className="font-serif font-bold text-primary text-lg md:text-xl hidden sm:block">{siteName}</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans font-semibold text-on-surface-variant hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block btn-primary-gradient text-white px-6 py-2 rounded-full font-sans font-bold text-sm">
            PPDB Online
          </button>
          
          <button 
            className="md:hidden text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-outline-variant/20 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans font-semibold text-on-surface-variant text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary-gradient text-white py-3 rounded-xl font-sans font-bold mt-2">
            PPDB Online
          </button>
        </motion.div>
      )}
    </nav>
  );
}
