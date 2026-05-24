'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveNewsAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const is_published = formData.get('is_published') === 'true'
    const file = formData.get('image') as File | null

    if (!title || !content) {
      return { success: false, message: 'Judul dan isi berita wajib diisi.' }
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    let image_url = null
    if (file && file.size > 0 && file.name) {
      const fileExt = file.name.split('.').pop()
      const fileName = `news_${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('public_media')
        .upload(`news/${fileName}`, file, { upsert: true })

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('public_media').getPublicUrl(`news/${fileName}`)
        image_url = publicUrl
      }
    }

    const { error } = await supabase.from('news').insert([{ 
      title, 
      slug, 
      content, 
      image_url,
      is_published
    }])
    
    if (error) throw error

    revalidatePath('/admin/news')
    revalidatePath('/berita')
    revalidatePath('/')
    
    return { success: true, message: 'Berita berhasil diterbitkan!' }
  } catch (error: any) {
    console.error('Error saving news:', error)
    return { success: false, message: 'Gagal menerbitkan berita: ' + (error.message || 'Error tidak diketahui') }
  }
}

export async function deleteNewsAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    if (!id) return { success: false, message: 'ID tidak ditemukan.' }

    const { error } = await supabase.from('news').delete().eq('id', id)
    if (error) throw error

    revalidatePath('/admin/news')
    revalidatePath('/berita')
    revalidatePath('/')
    
    return { success: true, message: 'Berita berhasil dihapus.' }
  } catch (error: any) {
    console.error('Error deleting news:', error)
    return { success: false, message: 'Gagal menghapus berita: ' + (error.message || 'Error tidak diketahui') }
  }
}
