'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { saveHeroAction } from './actions'
import { SubmitButton } from '@/components/admin/SubmitButton'
import { Award, BookOpen } from 'lucide-react'

interface HeroFormProps {
  initialHero: any
}

export function HeroForm({ initialHero }: HeroFormProps) {
  const [state, formAction] = useActionState(saveHeroAction, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
        <div className="flex items-center gap-3 mt-1">
          <input
            type="checkbox"
            name="show_badge"
            id="show_badge"
            defaultChecked={initialHero?.show_badge}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label htmlFor="show_badge" className="text-sm font-medium text-gray-700">Tampilkan Badge Pengumuman (PPDB)</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teks Badge</label>
          <input
            type="text"
            name="badge_text"
            defaultValue={initialHero?.badge_text || 'PPDB 2026/2027 Dibuka'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
            placeholder="Contoh: PPDB 2026/2027 Dibuka"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <BookOpen size={16} className="text-emerald-600" /> Card Dekorasi 1 (Atas)
          </h4>
          <div>
            <label className="block text-xs font-medium text-gray-500">Judul</label>
            <input type="text" name="card1_title" defaultValue={initialHero?.card1_title || 'Kurikulum Integrasi'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Sub-judul</label>
            <input type="text" name="card1_subtitle" defaultValue={initialHero?.card1_subtitle || 'Sains & Agama'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Award size={16} className="text-gold" /> Card Dekorasi 2 (Bawah)
          </h4>
          <div>
            <label className="block text-xs font-medium text-gray-500">Judul</label>
            <input type="text" name="card2_title" defaultValue={initialHero?.card2_title || 'Akreditasi A'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Sub-judul</label>
            <input type="text" name="card2_subtitle" defaultValue={initialHero?.card2_subtitle || 'Kualitas Terjamin'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Judul Utama</label>
        <input 
          type="text" 
          name="title" 
          defaultValue={initialHero?.title || 'Membangun Generasi Rabbani melalui Pendidikan Islami'} 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" 
          placeholder="Judul besar yang muncul di tengah banner"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sub Judul (Deskripsi Singkat)</label>
        <textarea 
          name="subtitle" 
          rows={3} 
          defaultValue={initialHero?.subtitle || 'Madrasah Aliyah Nurul Falah berkomitmen mencetak lulusan yang unggul dalam Imtaq dan Iptek.'} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
          placeholder="Deskripsi singkat di bawah judul utama"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Teks Tombol</label>
          <input 
            type="text" 
            name="button_text" 
            defaultValue={initialHero?.button_text || 'Daftar Sekarang'} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" 
            placeholder="Contoh: Daftar Sekarang"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Link Tombol</label>
          <input 
            type="text" 
            name="button_link" 
            defaultValue={initialHero?.button_link || '/ppdb'} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border" 
            placeholder="Contoh: /ppdb atau https://..."
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Latar Belakang (Opsional)</label>
        {initialHero?.image_url && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Gambar saat ini:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={initialHero.image_url} alt="Current hero" className="h-40 rounded-lg object-cover" />
          </div>
        )}
        <input type="file" name="image" accept="image/*" className="block w-full text-sm text-gray-500 border p-1 rounded" />
        <p className="mt-1 text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah gambar.</p>
      </div>

      <SubmitButton>
        Simpan Perubahan
      </SubmitButton>
    </form>
  )
}
