'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveFacilityAction, deleteFacilityAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'
import { Trash2, Image as ImageIcon } from 'lucide-react'

interface FacilitiesFormProps {
  initialFacilities: any[]
}

export function FacilitiesForm({ initialFacilities }: FacilitiesFormProps) {
  const [saveState, saveAction] = useActionState(saveFacilityAction, null)
  
  useEffect(() => {
    if (saveState?.success) {
      toast.success(saveState.message)
    } else if (saveState?.success === false) {
      toast.error(saveState.message)
    }
  }, [saveState])

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tambah Fasilitas Baru</h2>
          <form action={saveAction} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Fasilitas</label>
              <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Contoh: Laboratorium Komputer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea name="description" rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Deskripsi opsional..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gambar Fasilitas (Minimal 800x600px)</label>
              <input type="file" name="image" accept="image/*" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border p-1 rounded" />
            </div>
            <SubmitButton className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" loadingText="Menyimpan...">
              Unggah & Simpan
            </SubmitButton>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Daftar Fasilitas</h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!initialFacilities || initialFacilities.length === 0 ? (
            <div className="col-span-full justify-center text-gray-500 py-8 flex flex-col items-center">
               <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
               <p>Belum ada daftar fasilitas dinput.</p>
            </div>
          ) : (
            initialFacilities.map((fac) => (
              <FacilityItem key={fac.id} fac={fac} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function FacilityItem({ fac }: { fac: any }) {
  const [deleteState, deleteAction] = useActionState(deleteFacilityAction, null)

  useEffect(() => {
    if (deleteState?.success) {
      toast.success(deleteState.message)
    } else if (deleteState?.success === false) {
      toast.error(deleteState.message)
    }
  }, [deleteState])

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden group">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fac.image_url} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 flex gap-2">
          <form action={deleteAction}>
            <input type="hidden" name="id" value={fac.id} />
            <button type="submit" className="p-2 bg-white/90 text-red-600 rounded-full shadow hover:bg-red-50 transition-colors" title="Hapus">
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h4 className="font-semibold text-gray-900 truncate">{fac.title}</h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{fac.description}</p>
      </div>
    </div>
  )
}
