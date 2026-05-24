import { createClient } from '@/lib/supabase/server'
import { SettingsForm } from './SettingsForm'

export default async function SettingsAdmin() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*').limit(1).single()

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Pengaturan Situs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Atur informasi kontak, alamat, dan tautan sosial media untuk footer website.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <SettingsForm initialSettings={settings} />
        </div>
      </div>
    </div>
  )
}
