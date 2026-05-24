'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveProgramAction, deleteProgramAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'
import { Star, Trash2 } from 'lucide-react'

interface ProgramsFormProps {
  initialPrograms: any[]
}

export function ProgramsForm({ initialPrograms }: ProgramsFormProps) {
  const [saveState, saveAction] = useActionState(saveProgramAction, null)
  
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tambah Program Baru</h2>
          <form action={saveAction} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Program</label>
              <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Contoh: Tahfidz Al-Quran" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea name="description" required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Deskripsi singkat program..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Icon (Optional)</label>
              <input type="text" name="icon_name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" placeholder="Book, Star, dll (Lucide Icon name)" />
              <p className="mt-1 text-xs text-gray-500">Opsional. Default adalah ikon Star.</p>
            </div>
            <SubmitButton className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" loadingText="Menambahkan...">
              Tambah Program
            </SubmitButton>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Daftar Program</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {!initialPrograms || initialPrograms.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Belum ada program.</div>
          ) : (
            initialPrograms.map((prog) => (
              <ProgramItem key={prog.id} prog={prog} />
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

function ProgramItem({ prog }: { prog: any }) {
  const [deleteState, deleteAction] = useActionState(deleteProgramAction, null)

  useEffect(() => {
    if (deleteState?.success) {
      toast.success(deleteState.message)
    } else if (deleteState?.success === false) {
      toast.error(deleteState.message)
    }
  }, [deleteState])

  return (
    <li className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        <div className="bg-emerald-100 p-2 rounded-lg mt-1">
          <Star className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="ml-4">
          <h4 className="text-base font-semibold text-gray-900">{prog.title}</h4>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">{prog.description}</p>
          <span className="text-xs text-gray-400 mt-2 block">Ditambahkan: {new Date(prog.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0 flex space-x-2">
        <form action={deleteAction}>
          <input type="hidden" name="id" value={prog.id} />
          <button type="submit" className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors" title="Hapus">
            <Trash2 className="w-5 h-5" />
          </button>
        </form>
      </div>
    </li>
  )
}
