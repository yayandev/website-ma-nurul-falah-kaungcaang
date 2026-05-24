import { createClient } from '@/lib/supabase/server'
import ProgramListClient from '@/components/ProgramListClient'
import { BookOpen } from 'lucide-react'

export default async function Programs() {
  const supabase = await createClient();
  const { data: programs } = await supabase.from('programs').select('*').order('created_at', { ascending: true });

  const isEmpty = !programs || programs.length === 0;

  return (
    <section className="py-24 px-4 md:px-20 bg-white" id="akademik">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">Program Unggulan</h2>
          <div className="h-1.5 w-24 bg-gold mx-auto rounded-full"></div>
          <p className="font-sans text-on-surface-variant max-w-2xl mx-auto">
            Komitmen kami dalam menghadirkan ekosistem pendidikan yang holistik untuk masa depan gemilang.
          </p>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="text-primary/50" size={28} />
            </div>
            <p className="font-sans text-on-surface-variant font-medium">Program belum diinput.</p>
            <p className="text-sm text-gray-400">Tambahkan program unggulan melalui <a href="/admin/programs" className="text-emerald-600 hover:underline font-medium">Dashboard Admin → Programs</a>.</p>
          </div>
        ) : (
          <ProgramListClient programs={programs} />
        )}
      </div>
    </section>
  );
}
