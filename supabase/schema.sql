-- ==============================================
-- SUPABASE SCHEMA INITIALIZATION UNTUK MANAJEMEN WEB MADRASAH
-- Jalankan file ini melalui 'SQL Editor' di Supabase Dashboard
-- ==============================================

-- 1. Tabel Hero Content
CREATE TABLE hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image_url text,
  button_text text,
  button_link text,
  show_badge boolean DEFAULT true,
  badge_text text DEFAULT 'PPDB 2026/2027 Dibuka',
  card1_title text DEFAULT 'Kurikulum Integrasi',
  card1_subtitle text DEFAULT 'Sains & Agama',
  card2_title text DEFAULT 'Akreditasi A',
  card2_subtitle text DEFAULT 'Kualitas Terjamin',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Tabel Programs
CREATE TABLE programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_name text,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 3. Tabel Facilities
CREATE TABLE facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 4. Tabel Gallery
CREATE TABLE gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  category text,
  created_at timestamp with time zone DEFAULT now()
);

-- 5. Tabel News/Berita
CREATE TABLE news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  image_url text,
  author text DEFAULT 'Admin',
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 6. Tabel Settings (Data kontak, footer)
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text DEFAULT 'Madrasah Aliyah Nurul Falah',
  logo_url text,
  address text,
  phone text,
  email text,
  facebook_url text,
  instagram_url text,
  youtube_url text,
  updated_at timestamp with time zone DEFAULT now()
);

-- ==============================================
-- SETUP ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================

-- Mengaktifkan RLS
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy untuk read: bisa dibaca oleh semua orang (public anon)
CREATE POLICY "Public read hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Public read programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public read facilities" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read news" ON news FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- Policy untuk insert/update/delete: Hanya authenticated users (Admin)
CREATE POLICY "Auth all hero_content" ON hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all facilities" ON facilities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all news" ON news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth all settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================
-- SETUP OVO STORAGE (Untuk Gallery & Uploads)
-- ==============================================
-- Anda bisa menjalankan ini lewat SQL atau via menu Storage di UI Supabase.
insert into storage.buckets (id, name, public) 
values ('public_media', 'public_media', true)
ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access Storage" ON storage.objects FOR SELECT USING (bucket_id = 'public_media');
CREATE POLICY "Auth Upload Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'public_media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update/Delete Storage" ON storage.objects FOR UPDATE USING (bucket_id = 'public_media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete Storage" ON storage.objects FOR DELETE USING (bucket_id = 'public_media' AND auth.role() = 'authenticated');

-- ==============================================
-- DUMMY DATA INISIAL SETUP
-- ==============================================
INSERT INTO settings (site_name, address, phone, email) 
VALUES ('Madrasah Aliyah Nurul Falah', 'Jl. Pendidikan No 1, Jakarta', '081234567890', 'info@nurulfalah.sch.id')
ON CONFLICT DO NOTHING;

-- INSERT Default Hero
INSERT INTO hero_content (title, subtitle, button_text, button_link)
VALUES ('Pendidikan Berkualitas untuk Masa Depan Cemerlang', 'Membangun karakter islami dan kompetensi global di MA Nurul Falah.', 'Daftar Sekarang', '/pendaftaran')
ON CONFLICT DO NOTHING;

-- Tabel Profil & Visi Misi
CREATE TABLE profil_madrasah (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sejarah_text text NOT NULL DEFAULT '',
  sejarah_image_url text,
  visi text NOT NULL DEFAULT '',
  misi jsonb NOT NULL DEFAULT '[]'::jsonb,
  kepsek_name text,
  kepsek_message text,
  kepsek_image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE profil_madrasah ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read profil_madrasah objects" ON profil_madrasah FOR SELECT USING (true);
CREATE POLICY "Admin can update profil_madrasah" ON profil_madrasah FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can insert profil_madrasah" ON profil_madrasah FOR INSERT WITH CHECK (auth.role() = 'authenticated');
