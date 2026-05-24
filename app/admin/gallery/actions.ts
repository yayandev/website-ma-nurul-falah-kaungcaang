'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveGalleryAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const file = formData.get('image') as File

    if (!file || !file.name) {
      return { success: false, message: 'Gambar harus diunggah.' }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('public_media')
      .upload(`gallery/${fileName}`, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from('public_media').getPublicUrl(`gallery/${fileName}`)

    const { error } = await supabase.from('gallery').insert([{ 
      title, 
      category, 
      image_url: publicUrl 
    }])
    
    if (error) throw error

    revalidatePath('/admin/gallery')
    revalidatePath('/')
    
    return { success: true, message: 'Foto berhasil diunggah ke galeri!' }
  } catch (error: any) {
    console.error('Error saving gallery:', error)
    return { success: false, message: 'Gagal mengunggah foto: ' + (error.message || 'Error tidak diketahui') }
  }
}

export async function deleteGalleryAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    if (!id) return { success: false, message: 'ID tidak ditemukan.' }

    const { error } = await supabase.from('gallery').delete().eq('id', id)
    if (error) throw error

    revalidatePath('/admin/gallery')
    revalidatePath('/')
    
    return { success: true, message: 'Foto berhasil dihapus.' }
  } catch (error: any) {
    console.error('Error deleting gallery:', error)
    return { success: false, message: 'Gagal menghapus foto: ' + (error.message || 'Error tidak diketahui') }
  }
}
