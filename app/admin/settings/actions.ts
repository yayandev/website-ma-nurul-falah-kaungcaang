'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveSettingsAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()

    const { data: existing } = await supabase.from('settings').select('id').limit(1).single()

    const updateData: Record<string, string> = {
      site_name: formData.get('site_name') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      facebook_url: formData.get('facebook_url') as string,
      instagram_url: formData.get('instagram_url') as string,
      youtube_url: formData.get('youtube_url') as string,
    }

    // Handle logo upload
    const logoFile = formData.get('logo_file') as File
    if (logoFile && logoFile.size > 0 && logoFile.name) {
      const fileExt = logoFile.name.split('.').pop()
      const fileName = `logo_${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('public_media')
        .upload(`logos/${fileName}`, logoFile, { upsert: true })
      
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('public_media').getPublicUrl(`logos/${fileName}`)
        updateData.logo_url = publicUrl
      }
    }

    let error;
    if (existing) {
      const { error: updateError } = await supabase.from('settings').update(updateData).eq('id', existing.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from('settings').insert([updateData])
      error = insertError
    }
    
    if (error) throw error

    revalidatePath('/admin/settings')
    revalidatePath('/', 'layout') 
    
    return { success: true, message: 'Pengaturan berhasil disimpan!' }
  } catch (error: any) {
    console.error('Error saving settings:', error)
    return { success: false, message: 'Gagal menyimpan pengaturan: ' + (error.message || 'Error tidak diketahui') }
  }
}
