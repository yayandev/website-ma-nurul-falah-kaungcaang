import { createClient } from '@/lib/supabase/server';
import VisiMisiClient from './VisiMisiClient';

export default async function VisiMisi() {
  const supabase = await createClient();
  const { data: profil } = await supabase.from('profil_madrasah').select('visi, misi').limit(1).single();

  if (!profil?.visi) return null;

  return <VisiMisiClient data={{ visi: profil.visi, misi: profil.misi || [] }} />;
}

