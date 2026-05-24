import { createClient } from '@/lib/supabase/server'
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default async function Gallery() {
  const supabase = await createClient()
  const { data: galleryItems } = await supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(6)

  if (!galleryItems || galleryItems.length < 6) {
    return null;
  }
  
  const images = galleryItems.map(item => item.image_url);

  return (
    <section className="py-24 px-4 md:px-20 bg-white" id="prestasi">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Galeri Kegiatan</h2>
            <div className="h-1.5 w-24 bg-gold rounded-full"></div>
            <p className="font-sans text-on-surface-variant max-w-xl text-lg">
              Momen-momen inspiratif yang membentuk karakter dan kompetensi siswa kami.
            </p>
          </div>
          <a href="/berita" className="flex items-center gap-2 font-sans font-bold text-primary group">
            Lihat Semua Galeri <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
             <div className="relative h-64 rounded-3xl overflow-hidden group bg-gray-100">
                <Image src={images[0]} alt="Gallery 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" unoptimized />
             </div>
             <div className="relative h-96 rounded-3xl overflow-hidden group bg-gray-100">
                <Image src={images[3]} alt="Gallery 4" fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" unoptimized />
             </div>
          </div>
          <div className="flex flex-col gap-6">
             <div className="relative h-96 rounded-3xl overflow-hidden group bg-gray-100">
                <Image src={images[1]} alt="Gallery 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" unoptimized />
             </div>
             <div className="relative h-64 rounded-3xl overflow-hidden group bg-gray-100">
                <Image src={images[4]} alt="Gallery 5" fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" unoptimized />
             </div>
          </div>
          <div className="flex flex-col gap-6">
             <div className="relative h-64 rounded-3xl overflow-hidden group bg-gray-100">
                <Image src={images[2]} alt="Gallery 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" unoptimized />
             </div>
             <div className="relative h-96 rounded-3xl overflow-hidden group bg-gray-100">
                <Image src={images[5]} alt="Gallery 6" fill className="object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" unoptimized />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
