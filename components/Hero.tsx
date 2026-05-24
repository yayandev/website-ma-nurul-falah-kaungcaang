import { createClient } from '@/lib/supabase/server'
import HeroClient from '@/components/HeroClient'

export default async function Hero() {
  const supabase = await createClient()
  const { data: hero } = await supabase.from('hero_content').select('*').limit(1).single()

  if (!hero) {
    return null;
  }

  return <HeroClient hero={hero} />
}
