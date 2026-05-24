'use client';

import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

export default function ProgramListClient({ programs }: { programs: Program[] }) {
  // Helper to dynamically load icons
  const getIcon = (iconName: string): LucideIcon => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Star; // Fallback to Star if invalid
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((item, i) => {
        const IconComponent = getIcon(item.icon_name || 'Star');
        
        return (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-8 rounded-3xl border border-outline-variant/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-surface-container-lowest group"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
              <IconComponent size={32} />
            </div>
            <h3 className="font-serif text-2xl text-on-surface font-bold mb-4">{item.title}</h3>
            <p className="font-sans text-on-surface-variant leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
