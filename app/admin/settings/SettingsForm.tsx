'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveSettingsAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'

interface SettingsFormProps {
  initialSettings: any
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [state, formAction] = useActionState(saveSettingsAction, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Situs / Institusi</label>
          <input type="text" name="site_name" defaultValue={initialSettings?.site_name || ''} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo Sekolah</label>
          <input type="file" name="logo_file" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border p-1 rounded" />
          {initialSettings?.logo_url && (
            <div className="mt-2 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={initialSettings.logo_url} alt="Logo saat ini" className="h-10 w-10 object-contain border rounded" />
              <span className="text-xs text-gray-500">Logo saat ini</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Alamat Email</label>
          <input type="email" name="email" defaultValue={initialSettings?.email || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nomor Telepon / WhatsApp</label>
          <input type="text" name="phone" defaultValue={initialSettings?.phone || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
        <textarea name="address" rows={3} defaultValue={initialSettings?.address || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"></textarea>
      </div>

      <h3 className="text-lg font-medium text-gray-900 pt-4 border-t border-gray-100">Sosial Media</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
          <input type="url" name="facebook_url" defaultValue={initialSettings?.facebook_url || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="https://facebook.com/..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
          <input type="url" name="instagram_url" defaultValue={initialSettings?.instagram_url || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="https://instagram.com/..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
          <input type="url" name="youtube_url" defaultValue={initialSettings?.youtube_url || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="https://youtube.com/..." />
        </div>
      </div>
      
      <SubmitButton>
        Simpan Pengaturan
      </SubmitButton>
    </form>
  )
}
