'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveProfilAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'

interface ProfilFormProps {
  initialProfil: any
}

export function ProfilForm({ initialProfil }: ProfilFormProps) {
  const [state, formAction] = useActionState(saveProfilAction, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-8">
      {/* Sejarah Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Sejarah Singkat</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teks Sejarah</label>
          <textarea name="sejarah_text" rows={5} defaultValue={initialProfil?.sejarah_text || ''} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gambar Gedung/Sejarah Baru (Kosongkan bila tak ingin diubah)</label>
          <input type="file" name="sejarah_image" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 border p-1 rounded" />
          {initialProfil?.sejarah_image_url && (
            <p className="text-xs mt-1 text-blue-600">
              <a href={initialProfil.sejarah_image_url} target="_blank" rel="noreferrer">Lihat gambar saat ini</a>
            </p>
          )}
        </div>
      </div>

      {/* Visi & Misi Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Visi & Misi</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Visi</label>
          <textarea name="visi" rows={2} defaultValue={initialProfil?.visi || ''} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Misi (Pisahkan per baris)</label>
          <textarea name="misi" rows={5} defaultValue={initialProfil?.misi ? initialProfil.misi.join('\n') : ''} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Menyelenggarakan pendidikan...&#10;Membina peserta didik..."></textarea>
        </div>
      </div>

      {/* Sambutan Kepsek Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Sambutan Kepala Madrasah</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Kepala Madrasah</label>
          <input type="text" name="kepsek_name" defaultValue={initialProfil?.kepsek_name || ''} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pesan & Sambutan</label>
          <textarea name="kepsek_message" rows={4} defaultValue={initialProfil?.kepsek_message || ''} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pas Foto Kepsek (Kosongkan bila tak ingin diubah)</label>
          <input type="file" name="kepsek_image" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 border p-1 rounded" />
          {initialProfil?.kepsek_image_url && (
            <p className="text-xs mt-1 text-blue-600">
              <a href={initialProfil.kepsek_image_url} target="_blank" rel="noreferrer">Lihat foto saat ini</a>
            </p>
          )}
        </div>
      </div>
      
      <SubmitButton>
        Simpan Profil
      </SubmitButton>
    </form>
  )
}
