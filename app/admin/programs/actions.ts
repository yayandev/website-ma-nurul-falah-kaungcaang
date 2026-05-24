'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveProgramAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const icon_name = formData.get('icon_name') as string

    if (!title || !description) {
      return { success: false, message: 'Judul dan deskripsi harus diisi.' }
    }

    const { error } = await supabase.from('programs').insert([{ title, description, icon_name }])
    
    if (error) throw error

    revalidatePath('/admin/programs')
    revalidatePath('/')
    
    return { success: true, message: 'Program berhasil ditambahkan!' }
  } catch (error: any) {
    console.error('Error saving program:', error)
    return { success: false, message: 'Gagal menambahkan program: ' + (error.message || 'Error tidak diketahui') }
  }
}

export async function deleteProgramAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string
    
    if (!id) return { success: false, message: 'ID tidak ditemukan.' }

    const { error } = await supabase.from('programs').delete().eq('id', id)
    
    if (error) throw error

    revalidatePath('/admin/programs')
    revalidatePath('/')
    
    return { success: true, message: 'Program berhasil dihapus.' }
  } catch (error: any) {
    console.error('Error deleting program:', error)
    return { success: false, message: 'Gagal menghapus program: ' + (error.message || 'Error tidak diketahui') }
  }
}
