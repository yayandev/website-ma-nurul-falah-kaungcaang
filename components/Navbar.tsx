import { createClient } from '@/lib/supabase/server';
import NavbarClient from '@/components/NavbarClient';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('site_name, logo_url').limit(1).single();

  return (
    <NavbarClient
      siteName={settings?.site_name || 'Nurul Falah'}
      logoUrl={settings?.logo_url || null}
    />
  );
}
