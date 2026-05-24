import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { enforceSetup } from '@/lib/setup';

const categories = ['Semua'];

export default async function BeritaPage() {
  await enforceSetup();
  const supabase = await createClient();
  const { data: dbNews } = await supabase.from('news').select('*').eq('is_published', true).order('created_at', { ascending: false });

  const isEmpty = !dbNews || dbNews.length === 0;

  const newsArticles = (dbNews || []).map((n, i) => ({
    id: n.id,
    title: n.title,
    category: 'Umum',
    date: new Date(n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    author: n.author || 'Admin',
    excerpt: n.content.substring(0, 180) + (n.content.length > 180 ? '...' : ''),
    image: n.image_url || '',
    featured: i === 0,
  }));

  const featuredArticle = newsArticles.find(a => a.featured);
  const regularArticles = newsArticles.filter(a => !a.featured);


  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-20 girih-pattern">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="font-sans font-bold text-gold uppercase tracking-[0.2em] text-xs">Informasi & Update</span>
          <h1 className="font-serif text-5xl md:text-6xl text-primary font-bold">Kabar Madrasah</h1>
          <p className="font-sans text-on-surface-variant text-lg max-w-2xl">
            Ikuti berbagai kegiatan, prestasi, dan pengumuman terbaru dari Madrasah Aliyah Nurul Falah.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 pt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full font-sans font-bold text-sm transition-all border ${cat === 'Semua'
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : 'bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {isEmpty ? (
        <section className="py-24 px-4 md:px-20 text-center">
          <div className="max-w-7xl mx-auto space-y-6 flex flex-col items-center">
             <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/30">
                <Tag size={40} />
             </div>
             <p className="font-sans text-on-surface-variant text-xl">Belum ada berita atau informasi saat ini.</p>
             <p className="text-on-surface-variant/60 max-w-md mx-auto">Silakan hubungi administrator website untuk informasi lebih lanjut mengenai kegiatan madrasah.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured News */}
          {featuredArticle && (
            <section className="pb-12 px-4 md:px-20">
              <div className="max-w-7xl mx-auto">
                <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-outline-variant/20">
                  <div className="relative h-80 lg:h-auto overflow-hidden bg-gray-100">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-gold text-primary rounded-full font-sans font-bold text-xs uppercase tracking-wider">
                        Sorotan
                      </span>
                    </div>
                  </div>
                  <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-6 text-on-surface-variant text-sm font-sans font-bold opacity-70">
                      <span className="flex items-center gap-2"><Calendar size={16} /> {featuredArticle.date}</span>
                      <span className="flex items-center gap-2"><User size={16} /> {featuredArticle.author}</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold leading-tight underline-offset-8 decoration-gold/30 group-hover:underline">
                      {featuredArticle.title}
                    </h2>
                    <p className="font-sans text-on-surface-variant text-lg leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <button className="flex items-center gap-2 text-primary font-sans font-bold group/btn">
                      Baca Selengkapnya <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Article Grid */}
          <section className="py-12 pb-24 px-4 md:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <div key={article.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-outline-variant/30 hover:shadow-2xl transition-all hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden bg-gray-100">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        unoptimized
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1 bg-primary/90 backdrop-blur-md text-white rounded-full font-sans font-bold text-[10px] uppercase tracking-widest">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center gap-4 text-on-surface-variant text-xs font-sans font-bold opacity-60">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                      </div>
                      <h3 className="font-serif text-xl text-primary font-bold leading-snug group-hover:text-gold transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="font-sans text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="pt-4 mt-auto">
                        <button className="text-primary font-sans font-bold text-sm flex items-center gap-1 group/link">
                          Baca Berita <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
