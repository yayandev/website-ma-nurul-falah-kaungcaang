import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';

/**
 * Checks if the website has been set up (i.e. 'settings' table contains at least one record).
 * Redirects to '/setup' if it is not set up.
 */
export async function enforceSetup() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('id').limit(1).single();

  if (!settings) {
    redirect('/setup');
  }
}
