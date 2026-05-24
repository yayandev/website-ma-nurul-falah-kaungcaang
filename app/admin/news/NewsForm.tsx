'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveNewsAction, deleteNewsAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'
import { Trash2 } from 'lucide-react'

interface NewsFormProps {
  initialNews: any[]
}

export function NewsForm({ initialNews }: NewsFormProps) {
  const [saveState, saveAction] = useActionState(saveNewsAction, null)
  
  useEffect(() => {
    if (saveState?.success) {
      toast.success(saveState.message)
    } else if (saveState?.success === false) {
      toast.error(saveState.message)
    }
  }, [saveState])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
      <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/50">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tulis Berita Baru</h2>
        <form action={saveAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
            <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Isi Berita</label>
            <textarea name="content" required rows={6} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gambar Cover</label>
            <input type="file" name="image" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 border p-1 rounded" />
          </div>
          <div>
             <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mt-4 cursor-pointer">
               <input type="checkbox" name="is_published" value="true" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
               Publikasikan Langsung
             </label>
          </div>
          <SubmitButton loadingText="Menerbitkan...">
            Terbitkan Berita
          </SubmitButton>
        </form>
      </div>

      <div className="p-6 md:w-2/3">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Berita</h3>
        <div className="space-y-4">
          {!initialNews || initialNews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada berita diterbitkan.</p>
          ) : (
            initialNews.map((news) => (
              <NewsItem key={news.id} news={news} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function NewsItem({ news }: { news: any }) {
  const [deleteState, deleteAction] = useActionState(deleteNewsAction, null)

  useEffect(() => {
    if (deleteState?.success) {
      toast.success(deleteState.message)
    } else if (deleteState?.success === false) {
      toast.error(deleteState.message)
    }
  }, [deleteState])

  return (
    <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
       {news.image_url ? (
         // eslint-disable-next-line @next/next/no-img-element
         <img src={news.image_url} alt={news.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
       ) : (
         <div className="w-24 h-24 rounded-lg bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">No Image</div>
       )}
       <div className="flex-1 min-w-0">
         <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-gray-900 truncate">{news.title}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${news.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {news.is_published ? 'Published' : 'Draft'}
            </span>
         </div>
         <p className="text-xs text-gray-500 mt-1 mb-2">
           {new Date(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}
         </p>
         <p className="text-sm text-gray-600 line-clamp-2">{news.content}</p>
       </div>
       <div className="flex flex-col gap-2 border-l border-gray-100 pl-4 justify-center">
          <form action={deleteAction}>
            <input type="hidden" name="id" value={news.id} />
            <button type="submit" className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Hapus Berita">
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
       </div>
    </div>
  )
}
