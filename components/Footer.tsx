import { createClient } from '@/lib/supabase/server'
import FooterClient from '@/components/FooterClient'
import { CallToActionClient } from '@/components/CallToActionClient'

export async function CallToAction() {
  return <CallToActionClient />
}

export async function Footer() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*').limit(1).single()
  return <FooterClient settings={settings} />
}

