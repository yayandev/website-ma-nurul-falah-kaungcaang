'use client';

import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import Image from 'next/image';

interface Settings {
  site_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  logo_url?: string;
}

export default function FooterClient({ settings }: { settings: Settings | null }) {
  const s = settings || {};
  const siteName = s.site_name || 'Madrasah';

  const links = [
    { title: 'Visi & Misi', href: '/profil' },
    { title: 'Program Unggulan', href: '/#akademik' },
    { title: 'Fasilitas', href: '/#fasilitas' },
    { title: 'Galeri Kegiatan', href: '/#prestasi' },
    { title: 'Berita & Info', href: '/berita' },
    { title: 'Profil Madrasah', href: '/profil' },
  ];

  return (
    <footer className="bg-surface-container-low pt-24 pb-12 px-4 md:px-20 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            {s.logo_url ? (
              <div className="relative w-12 h-12 overflow-hidden rounded-xl">
                <Image src={s.logo_url} alt={siteName} fill className="object-contain" unoptimized />
              </div>
            ) : (
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl">
                {siteName.charAt(0)}
              </div>
            )}
            <h3 className="font-serif text-2xl font-bold text-primary max-w-xs leading-tight">{siteName}</h3>
          </div>
          <p className="font-sans text-on-surface-variant text-lg leading-relaxed max-w-md">
            Pusat keunggulan pendidikan Islam modern yang memadukan tradisi keilmuan klasik dengan inovasi teknologi masa depan.
          </p>
          <div className="flex gap-4 pt-4">
            {s.instagram_url && (
              <a href={s.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Instagram size={20}/></a>
            )}
            {s.facebook_url && (
              <a href={s.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Facebook size={20}/></a>
            )}
            {s.youtube_url && (
              <a href={s.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Youtube size={20}/></a>
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-sans font-bold text-primary uppercase tracking-widest text-sm mb-8">Tautan Cepat</h4>
          <ul className="grid grid-cols-1 gap-4">
            {links.map((link) => (
              <li key={link.title}>
                <a href={link.href} className="font-sans text-on-surface-variant hover:text-gold transition-colors block underline-offset-4 hover:underline">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-sans font-bold text-primary uppercase tracking-widest text-sm mb-8">Kontak & Lokasi</h4>
          <ul className="space-y-6">
            {s.address && (
              <li className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0 mt-1" size={24} />
                <span className="font-sans text-on-surface-variant text-lg">{s.address}</span>
              </li>
            )}
            {s.phone && (
              <li className="flex items-center gap-4">
                <Phone className="text-gold shrink-0" size={24} />
                <span className="font-sans text-on-surface-variant text-lg">{s.phone}</span>
              </li>
            )}
            {s.email && (
              <li className="flex items-center gap-4">
                <Mail className="text-gold shrink-0" size={24} />
                <span className="font-sans text-on-surface-variant text-lg">{s.email}</span>
              </li>
            )}
            {!s.address && !s.phone && !s.email && (
              <li className="text-on-surface-variant/50 italic text-sm">Informasi kontak belum diisi.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-outline-variant/30 text-center">
        <p className="font-sans text-sm text-on-surface-variant opacity-70">
          © {new Date().getFullYear()} {siteName}. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
