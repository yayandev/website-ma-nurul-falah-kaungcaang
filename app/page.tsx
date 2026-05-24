import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Programs from '@/components/Programs';
import About from '@/components/About';
import VisiMisi from '@/components/VisiMisi';
import Facilities from '@/components/Facilities';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import { CallToAction, Footer } from '@/components/Footer';

import { enforceSetup } from '@/lib/setup';

export default async function Home() {
  await enforceSetup();
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Programs />
      <VisiMisi />
      <Facilities />
      <Gallery />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
