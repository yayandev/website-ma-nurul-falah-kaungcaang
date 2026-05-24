import { createClient } from '@/lib/supabase/server'
import { FacilitiesForm } from './FacilitiesForm'

export default async function FacilitiesAdmin() {
  const supabase = await createClient()
  const { data: facilities } = await supabase.from('facilities').select('*').order('created_at', { ascending: false })

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Kelola Fasilitas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Unggah dan kelola data infrastruktur sekolah.
          </p>
        </div>
      </div>

      <FacilitiesForm initialFacilities={facilities || []} />
    </div>
  )
}
