import { createClient } from '@/lib/supabase/server'
import { NewsForm } from './NewsForm'

export default async function NewsAdmin() {
  const supabase = await createClient()
  const { data: newsList } = await supabase.from('news').select('*').order('created_at', { ascending: false })

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Kelola Berita & Artikel</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tulis dan publikasikan berita kegiatan sekolah.
          </p>
        </div>
      </div>

      <NewsForm initialNews={newsList || []} />
    </div>
  )
}
