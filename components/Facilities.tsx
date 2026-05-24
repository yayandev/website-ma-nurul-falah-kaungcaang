import { createClient } from '@/lib/supabase/server'
import FacilityListClient from '@/components/FacilityListClient'
import { Building2 } from 'lucide-react'

export default async function Facilities() {
  const supabase = await createClient();
  const { data: facilities } = await supabase.from('facilities').select('*').order('created_at', { ascending: true });

  const isEmpty = !facilities || facilities.length === 0;

  return (
    <section className="py-24 px-4 md:px-20 bg-surface-container-low girih-pattern" id="fasilitas">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Fasilitas Modern</h2>
            <div className="h-1.5 w-24 bg-gold rounded-full"></div>
            <p className="font-sans text-on-surface-variant max-w-xl text-lg">
              Infrastruktur kelas satu didesain khusus untuk mengoptimalkan potensi akademis dan ekstrakurikuler.
            </p>
          </div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 border-2 border-dashed border-gray-300 rounded-3xl bg-white/60">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="text-primary/50" size={28} />
            </div>
            <p className="font-sans text-on-surface-variant font-medium">Fasilitas belum diinput.</p>
            <p className="text-sm text-gray-400">Tambahkan data fasilitas melalui <a href="/admin/facilities" className="text-emerald-600 hover:underline font-medium">Dashboard Admin → Facilities</a>.</p>
          </div>
        ) : (
          <FacilityListClient facilities={facilities} />
        )}
      </div>
    </section>
  );
}
