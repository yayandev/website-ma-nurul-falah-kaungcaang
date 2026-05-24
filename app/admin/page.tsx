import { createClient } from '@/lib/supabase/server'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: settings } = await supabase.from('settings').select('id, site_name, email, phone, address, logo_url').limit(1).single()
  const { data: hero } = await supabase.from('hero_content').select('id').limit(1).single()
  const { count: programsCount } = await supabase.from('programs').select('*', { count: 'exact', head: true })
  const { count: facilitiesCount } = await supabase.from('facilities').select('*', { count: 'exact', head: true })
  const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true })
  const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true })
  const { data: profil } = await supabase.from('profil_madrasah').select('id, sejarah_text, visi, misi, kepsek_name').limit(1).single()

  const missingData = []
  if (!settings) missingData.push({ label: 'Pengaturan Situs', href: '/admin/settings' })
  if (!hero) missingData.push({ label: 'Hero Banner', href: '/admin/hero' })
  if (!programsCount || programsCount === 0) missingData.push({ label: 'Program Unggulan', href: '/admin/programs' })
  if (!facilitiesCount || facilitiesCount === 0) missingData.push({ label: 'Fasilitas', href: '/admin/facilities' })
  if (!galleryCount || galleryCount === 0) missingData.push({ label: 'Galeri Foto', href: '/admin/gallery' })
  if (!newsCount || newsCount === 0) missingData.push({ label: 'Berita & Artikel', href: '/admin/news' })
  if (!profil) missingData.push({ label: 'Profil & Visi Misi', href: '/admin/profil' })

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Dashboard Administrator</h1>
        <p className="mt-2 text-sm text-gray-600">
          Kelola konten website {settings?.site_name || 'Madrasah Aliyah Nurul Falah'} Anda di sini.
        </p>
      </div>

      {missingData.length > 0 ? (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-amber-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-amber-800">Data Belum Lengkap</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>Beberapa bagian website Anda belum memiliki data. Segera isi data pada menu berikut agar website tampil sempurna:</p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  {missingData.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="underline font-semibold hover:text-amber-900 transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-6 rounded-r-xl shadow-sm">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 flex-shrink-0" />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-emerald-800">Website Siap Publikasi!</h3>
              <p className="text-sm text-emerald-700">Semua data utama telah terisi. Website Anda sekarang tampil lengkap untuk pengunjung.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Program', count: programsCount || 0, color: 'emerald' },
          { label: 'Fasilitas', count: facilitiesCount || 0, color: 'blue' },
          { label: 'Galeri', count: galleryCount || 0, color: 'purple' },
          { label: 'Berita', count: newsCount || 0, color: 'rose' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100 p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-bold text-gray-900">{stat.count}</dd>
            <div className={`mt-2 h-1 w-8 rounded-full bg-${stat.color}-500`}></div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="text-blue-500" size={20} />
          Ringkasan Setup
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
           <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Nama Situs</span>
                <span className="font-semibold text-gray-900">{settings?.site_name || '-'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Email Kontak</span>
                <span className="font-semibold text-gray-900">{settings?.email || '-'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Logo</span>
                <span className="font-semibold text-gray-900">{settings?.logo_url ? 'Sudah Ada' : 'Belum Ada'}</span>
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Sejarah</span>
                <span className="font-semibold text-gray-900">{profil?.sejarah_text ? 'Sudah Ada' : 'Belum Ada'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Visi & Misi</span>
                <span className="font-semibold text-gray-900">{profil?.visi ? 'Sudah Ada' : 'Belum Ada'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Kepala Madrasah</span>
                <span className="font-semibold text-gray-900">{profil?.kepsek_name || '-'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
