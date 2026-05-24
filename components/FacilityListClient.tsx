'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface Facility {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export default function FacilityListClient({ facilities }: { facilities: Facility[] }) {
  // If there's 1 facility, it spans full. If 2, then split. If 3+, follow original masonry-ish grid.
  
  if (facilities.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
      {facilities.map((fac, i) => {
        // Logika grid: item ke-0 ambil 8 kolom & 2 baris (besar), sisanya ambil 4 kolom
        // Jika item lebih dari 3, kita taruh di bawahnya.
        let colSpan = "md:col-span-4";
        let rowSpan = "";
        
        if (i === 0) {
          colSpan = "md:col-span-8";
          rowSpan = "md:row-span-2";
        }
        
        // Hide items beyond 3 if we strictly follow the original layout, 
        // but let's let them flow normally for additional items.
        
        return (
          <motion.div
            key={fac.id || i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${colSpan} ${rowSpan} relative rounded-3xl overflow-hidden group shadow-lg min-h-[300px]`}
          >
            <Image
              src={fac.image_url}
              alt={fac.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
              unoptimized // To allow any external URLs without config issues
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
              {i > 0 && <span className="font-sans font-bold text-gold text-xs uppercase tracking-widest mb-1 line-clamp-1">{fac.description}</span>}
              <h3 className={`font-serif text-white font-bold mb-3 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                {fac.title}
              </h3>
              {i === 0 && (
                <p className="font-sans text-white/80 max-w-lg leading-relaxed line-clamp-3">
                  {fac.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
