import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Madrasah Aliyah Nurul Falah | Premium Modern Islamic Education',
  description: 'Membangun Generasi Islami, Cerdas, dan Berprestasi dengan kurikulum integrasi sains dan agama.',
};

import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${sourceSerif4.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased">
        <NextTopLoader 
          color="#059669" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #059669,0 0 5px #059669"
        />
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
