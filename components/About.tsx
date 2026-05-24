import { createClient } from '@/lib/supabase/server';
import AboutClient from './AboutClient';

export default async function About() {
  const supabase = await createClient();
  const { data: profil } = await supabase.from('profil_madrasah').select('sejarah_text, sejarah_image_url').limit(1).single();

  if (!profil?.sejarah_text) return null;

  return <AboutClient data={{ text: profil.sejarah_text, image_url: profil.sejarah_image_url || '' }} />;
}
