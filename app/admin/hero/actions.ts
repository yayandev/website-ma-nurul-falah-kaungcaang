'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveHeroAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const subtitle = formData.get('subtitle') as string
    const button_text = formData.get('button_text') as string
    const button_link = formData.get('button_link') as string
    const file = formData.get('image') as File | null

    if (!title) {
        return { success: false, message: 'Judul utama harus diisi.' }
    }

    let image_url = null
    if (file && file.size > 0 && file.name) {
      const fileExt = file.name.split('.').pop()
      const fileName = `hero_${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('public_media')
        .upload(`hero/${fileName}`, file, { upsert: true })

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('public_media').getPublicUrl(`hero/${fileName}`)
        image_url = publicUrl
      }
    }

    const show_badge = formData.get('show_badge') === 'on'
    const badge_text = formData.get('badge_text') as string
    const card1_title = formData.get('card1_title') as string
    const card1_subtitle = formData.get('card1_subtitle') as string
    const card2_title = formData.get('card2_title') as string
    const card2_subtitle = formData.get('card2_subtitle') as string

    const { data: existing } = await supabase.from('hero_content').select('id').limit(1).single()

    const updateData: any = { 
      title, 
      subtitle, 
      button_text, 
      button_link,
      show_badge,
      badge_text,
      card1_title,
      card1_subtitle,
      card2_title,
      card2_subtitle
    }
    if (image_url) updateData.image_url = image_url

    let error;
    if (existing) {
      const { error: updateError } = await supabase.from('hero_content').update(updateData).eq('id', existing.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from('hero_content').insert([updateData])
      error = insertError
    }
    
    if (error) throw error

    revalidatePath('/admin/hero')
    revalidatePath('/')
    
    return { success: true, message: 'Hero banner berhasil disimpan!' }
  } catch (error: any) {
    console.error('Error saving hero:', error)
    return { success: false, message: 'Gagal menyimpan hero: ' + (error.message || 'Error tidak diketahui') }
  }
}
