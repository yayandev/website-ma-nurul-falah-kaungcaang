import { createClient } from '@/lib/supabase/server'
import { HeroForm } from './HeroForm'

export default async function HeroAdmin() {
  const supabase = await createClient()
  const { data: hero } = await supabase.from('hero_content').select('*').limit(1).single()

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Kelola Hero Banner</h1>
          <p className="mt-1 text-sm text-gray-500">
            Atur teks selamat datang dan gambar latar belakang utama website.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <HeroForm initialHero={hero} />
        </div>
      </div>
    </div>
  )
}
