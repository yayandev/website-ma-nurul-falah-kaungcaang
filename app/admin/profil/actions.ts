'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveProfilAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()

    const { data: existing } = await supabase.from('profil_madrasah').select('id').limit(1).single()

    const updateData: any = {
      sejarah_text: formData.get('sejarah_text') as string,
      visi: formData.get('visi') as string,
      kepsek_name: formData.get('kepsek_name') as string,
      kepsek_message: formData.get('kepsek_message') as string,
    }

    // Parse misi as JSON array
    const misiRaw = formData.get('misi') as string
    updateData.misi = misiRaw ? misiRaw.split('\n').map((m) => m.trim()).filter((m) => m !== '') : []

    // Handle uploaded images
    const uploadImage = async (fieldName: string, pathPrefix: string) => {
      const file = formData.get(fieldName) as File
      if (file && file.size > 0 && file.name) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${pathPrefix}_${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('public_media').upload(`profil/${fileName}`, file, { upsert: true })
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('public_media').getPublicUrl(`profil/${fileName}`)
          updateData[fieldName + '_url'] = publicUrl
        }
      }
    }

    await uploadImage('sejarah_image', 'sejarah')
    await uploadImage('kepsek_image', 'kepsek')

    let error;
    if (existing) {
      const { error: updateError } = await supabase.from('profil_madrasah').update(updateData).eq('id', existing.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from('profil_madrasah').insert([updateData])
      error = insertError
    }
    
    if (error) throw error

    revalidatePath('/admin/profil')
    revalidatePath('/profil')
    revalidatePath('/')
    
    return { success: true, message: 'Profil madrasah berhasil diperbarui!' }
  } catch (error: any) {
    console.error('Error saving profil:', error)
    return { success: false, message: 'Gagal memperbarui profil: ' + (error.message || 'Error tidak diketahui') }
  }
}
