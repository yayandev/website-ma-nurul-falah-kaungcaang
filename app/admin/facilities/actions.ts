'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveFacilityAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file = formData.get('image') as File

    if (!title || !file || !file.name) {
      return { success: false, message: 'Judul dan gambar harus diisi.' }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('public_media')
      .upload(`facilities/${fileName}`, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from('public_media').getPublicUrl(`facilities/${fileName}`)

    const { error } = await supabase.from('facilities').insert([{ 
      title, 
      description, 
      image_url: publicUrl 
    }])
    
    if (error) throw error

    revalidatePath('/admin/facilities')
    revalidatePath('/')
    
    return { success: true, message: 'Fasilitas berhasil ditambahkan!' }
  } catch (error: any) {
    console.error('Error saving facility:', error)
    return { success: false, message: 'Gagal menambahkan fasilitas: ' + (error.message || 'Error tidak diketahui') }
  }
}

export async function deleteFacilityAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    if (!id) return { success: false, message: 'ID tidak ditemukan.' }

    const { error } = await supabase.from('facilities').delete().eq('id', id)
    if (error) throw error

    revalidatePath('/admin/facilities')
    revalidatePath('/')
    
    return { success: true, message: 'Fasilitas berhasil dihapus.' }
  } catch (error: any) {
    console.error('Error deleting facility:', error)
    return { success: false, message: 'Gagal menghapus fasilitas: ' + (error.message || 'Error tidak diketahui') }
  }
}
