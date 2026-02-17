-- ============================================
-- SCHEMA LENGKAP UNTUK WEBSITE BIRUNIAGA
-- ============================================

-- 1. TABEL SITE SETTINGS (Logo, Hero, Kontak, dll)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, description) VALUES
('logo_bumdes_url', 'https://xjnlgscroleykailitat.supabase.co/storage/v1/object/public/images/site/logo-bumdes.png', 'URL logo BUMDes'),
('logo_desa_url', 'https://xjnlgscroleykailitat.supabase.co/storage/v1/object/public/images/site/logo-desa.png', 'URL logo Desa'),
('hero_image_url', 'https://xjnlgscroleykailitat.supabase.co/storage/v1/object/public/images/site/desa-banyu.png', 'URL gambar hero background'),
('hero_title', 'Dari Desa, Untuk Pasar Lebih Luas', 'Judul hero section'),
('hero_subtitle', 'Produk Unggulan Banyubiru', 'Subjudul hero section'),
('hero_description', 'Mendorong pertumbuhan ekonomi desa melalui kurasi produk Olahan terbaik Banyubiru. Dikelola profesional oleh BUMDes untuk kualitas yang mendunia.', 'Deskripsi hero section'),
('whatsapp_number', '+6283119013471', 'Nomor WhatsApp untuk kontak'),
('site_title', 'Biruniaga - BUMDes Banyubiru', 'Judul website'),
('site_description', 'Biruniaga - BUMDes Banyubiru. Produk olahan UMKM unggulan Desa Banyubiru, Kec. Dukun, Kab. Magelang. Banana Kres, Abon Sapi, Kripik Bakso, dan lainnya.', 'Deskripsi website untuk SEO'),
('footer_copyright', '© 2026 Biruniaga. Seluruh Hak Cipta Dilindungi. Didukung oleh BUMDes Banyubiru.', 'Teks copyright footer'),
('email', 'nirmalabirub@gmail.com', 'Email kontak'),
('address', 'Dusun Wates, Desa Banyubiru, Kecamatan Dukun, Kabupaten Magelang, Jawa Tengah, Indonesia 56482', 'Alamat lengkap')
ON CONFLICT (key) DO NOTHING;

-- 2. TABEL TENTANG (About Us Content)
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default about content
INSERT INTO about_content (section, title, content, order_index) VALUES
('intro', 'Profil Desa Banyubiru', 'Desa Banyubiru merupakan jantung kreativitas di wilayahnya, dikenal dengan kekayaan alam dan semangat gotong royong warganya. Terletak di kawasan strategis, desa ini memiliki sejarah panjang sebagai pusat pertanian dan kini bertransformasi menjadi pusat UMKM unggulan.', 1),
('sejarah', 'Sejarah Desa', 'Desa Banyubiru memiliki sejarah panjang sebagai pusat pertanian dan perdagangan lokal. Nama "Banyubiru" sendiri berasal dari kondisi geografis desa yang memiliki sumber mata air jernih berwarna kebiruan. Sejak zaman dahulu, desa ini telah menjadi tempat berkembangnya berbagai kerajinan dan makanan tradisional yang diwariskan turun temurun.', 2),
('visi', 'Visi Desa', 'Mewujudkan Desa Banyubiru sebagai desa mandiri, sejahtera, dan berkelanjutan melalui pemberdayaan ekonomi kreatif berbasis produk lokal berkualitas.', 3),
('misi', 'Misi Desa', 'Mengembangkan potensi ekonomi lokal melalui UMKM dan industri kreatif. Meningkatkan kualitas SDM melalui pelatihan dan pendampingan berkelanjutan. Memperluas akses pasar untuk produk-produk lokal Banyubiru. Menjaga kelestarian lingkungan dan tradisi budaya lokal. Meningkatkan kesejahteraan masyarakat secara merata dan berkeadilan.', 4),
('geografis', 'Keunggulan Geografis', 'Keunggulan geografis Banyubiru mendukung lahirnya berbagai bahan baku berkualitas tinggi yang kemudian diolah oleh tangan-tangan terampil penduduk setempat menjadi produk yang memiliki nilai jual tinggi di pasar nasional.', 5)
ON CONFLICT (section) DO NOTHING;

-- 3. TABEL BUMDES INFO
CREATE TABLE IF NOT EXISTS bumdes_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default BUMDes info
INSERT INTO bumdes_info (section, title, content, order_index) VALUES
('intro', 'Tentang BUMDes Biruniaga', 'BUMDes Biruniaga adalah lembaga ekonomi desa yang didirikan untuk meningkatkan kesejahteraan masyarakat Desa Banyubiru melalui pengembangan potensi ekonomi lokal. Sejak berdiri, BUMDes Biruniaga telah berkomitmen untuk memberdayakan UMKM lokal dengan memberikan akses pasar yang lebih luas, pelatihan kualitas produk, dan dukungan pemasaran yang profesional.', 1),
('misi', 'Misi Kami', 'Berkomitmen untuk membawa produk UMKM Banyubiru ke pasar yang lebih luas dengan standar kualitas terjamin dan kemasan yang modern, sambil tetap menjaga kearifan lokal dan keberlanjutan lingkungan.', 2),
('visi', 'Visi', 'Menjadikan BUMDes Biruniaga sebagai motor penggerak transformasi ekonomi pedesaan yang modern, inklusif, dan berorientasi pada kualitas produk unggulan yang mampu bersaing di pasar nasional.', 3),
('misi_detail', 'Misi Detail', 'Mengembangkan dan memasarkan produk UMKM lokal dengan standar kualitas tinggi. Memberikan pelatihan dan pendampingan kepada pelaku UMKM desa. Membangun jaringan distribusi dan akses pasar yang luas.', 4),
('pemberdayaan', 'Pemberdayaan', 'Membina puluhan pengrajin dan produsen makanan lokal melalui pelatihan dan pendampingan berkelanjutan.', 5),
('kualitas', 'Kualitas', 'Seleksi ketat untuk memastikan standar kesehatan, kebersihan, dan rasa pada setiap produk.', 6)
ON CONFLICT (section) DO NOTHING;

-- 4. TABEL SOCIAL MEDIA LINKS
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default social links
INSERT INTO social_links (platform, url, icon, order_index) VALUES
('whatsapp', 'https://wa.me/6283119013471', 'whatsapp', 1),
('instagram', 'https://instagram.com/biruniaga', 'instagram', 2),
('facebook', 'https://facebook.com/biruniaga', 'facebook', 3)
ON CONFLICT DO NOTHING;

-- 5. ENABLE RLS (Row Level Security)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE bumdes_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- 6. POLICIES - Public read, admin write
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read about_content" ON about_content FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read bumdes_info" ON bumdes_info FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage bumdes_info" ON bumdes_info FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read social_links" ON social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');

-- 7. FUNCTIONS untuk auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. TRIGGERS
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bumdes_info_updated_at BEFORE UPDATE ON bumdes_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
