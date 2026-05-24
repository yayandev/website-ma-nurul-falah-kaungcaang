'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveGalleryAction, deleteGalleryAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'
import { Trash2, Image as ImageIcon } from 'lucide-react'

interface GalleryFormProps {
  initialGallery: any[]
}

export function GalleryForm({ initialGallery }: GalleryFormProps) {
  const [saveState, saveAction] = useActionState(saveGalleryAction, null)
  
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
          <form action={saveAction} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Foto (Opsional)</label>
              <input type="text" name="title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Contoh: Lomba Tahfidz Tingkat Provinsi" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pilih Gambar</label>
              <input type="file" name="image" accept="image/*" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border p-1 rounded" />
            </div>
            <SubmitButton className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" loadingText="Mengunggah...">
              Unggah Foto
            </SubmitButton>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Daftar Foto</h3>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {!initialGallery || initialGallery.length === 0 ? (
            <div className="col-span-full justify-center text-gray-500 py-8 flex flex-col items-center">
               <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
               <p>Belum ada foto galeri dinput.</p>
            </div>
          ) : (
            initialGallery.map((item) => (
              <GalleryItem key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function GalleryItem({ item }: { item: any }) {
  const [deleteState, deleteAction] = useActionState(deleteGalleryAction, null)

  useEffect(() => {
    if (deleteState?.success) {
      toast.success(deleteState.message)
    } else if (deleteState?.success === false) {
      toast.error(deleteState.message)
    }
  }, [deleteState])

  return (
    <div className="aspect-square relative rounded-xl overflow-hidden group border border-gray-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image_url} alt={item.title || 'Gallery'} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <form action={deleteAction}>
          <input type="hidden" name="id" value={item.id} />
          <button type="submit" className="p-2 bg-white text-red-600 rounded-full shadow hover:bg-red-50 transition-colors" title="Hapus">
            <Trash2 className="w-5 h-5" />
          </button>
        </form>
      </div>
      {item.title && (
         <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-white text-xs truncate">
           {item.title}
         </div>
      )}
    </div>
  )
}
