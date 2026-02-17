# Fitur Konten Dinamis Website Biruniaga

## Overview

Semua konten website sekarang 100% dinamis dan bisa dikelola dari Admin Panel tanpa perlu edit kode.

## Fitur yang Sudah Dinamis

### 1. **Produk** ✅
- Semua halaman produk load dari database Supabase
- Gambar produk dari Supabase Storage
- Filter, sort, dan search produk
- Detail produk dan produk terkait
- Halaman: `index.html`, `produk.html`, `produk-unggulan.html`, `detail-produk.html`

### 2. **Logo & Gambar** ✅
- Logo BUMDes (navbar, footer, admin panel)
- Logo Desa
- Hero background image
- Semua URL disimpan di database `site_settings`
- Bisa diupdate dari Admin Panel → Pengaturan Website

### 3. **Hero Section** ✅
- Judul hero
- Subjudul hero
- Deskripsi hero
- Background image
- Semua bisa diedit dari Admin Panel

### 4. **Kontak & WhatsApp** ✅
- Nomor WhatsApp dinamis dari database
- Email kontak
- Alamat
- Form kontak otomatis kirim ke WhatsApp + save ke database
- Halaman: `kontak.html`

### 5. **Pesan Masuk** ✅
- Form kontak save ke tabel `messages`
- Admin bisa lihat semua pesan di Admin Panel → Pesan Masuk
- Mark as read/unread
- Delete pesan
- Badge notifikasi unread

## Cara Menggunakan

### Kelola Konten dari Admin Panel

1. **Login ke Admin Panel**
   ```
   https://your-domain.com/admin-panel/
   ```

2. **Kelola Produk**
   - Klik menu **Produk**
   - Tambah, edit, atau hapus produk
   - Upload gambar produk
   - Set produk sebagai featured
   - Aktifkan/nonaktifkan produk

3. **Kelola Pengaturan Website**
   - Klik menu **Pengaturan Website**
   - Edit logo, hero, kontak, dll
   - Klik **Simpan** untuk setiap perubahan
   - Refresh website utama untuk lihat perubahan

4. **Lihat Pesan Masuk**
   - Klik menu **Pesan Masuk**
   - Lihat semua pesan dari form kontak
   - Mark as read atau delete
   - Badge merah menunjukkan jumlah pesan belum dibaca

### Update Nomor WhatsApp

Ada 2 cara:

**Cara 1: Via Admin Panel (Recommended)**
1. Login ke admin panel
2. Klik **Pengaturan Website**
3. Scroll ke bagian **Informasi Kontak**
4. Edit field **Nomor WhatsApp untuk kontak**
5. Klik **Simpan**

**Cara 2: Via SQL**
```sql
UPDATE site_settings 
SET value = '+6283119013471' 
WHERE key = 'whatsapp_number';
```

### Update Logo atau Hero Image

**Via Admin Panel:**
1. Upload gambar baru ke Supabase Storage
2. Copy URL public
3. Login ke admin panel
4. Klik **Pengaturan Website**
5. Paste URL baru di field yang sesuai
6. Klik **Simpan**

## Struktur Database

### Tabel Baru

1. **site_settings** - Pengaturan website
   - Logo URLs
   - Hero content
   - Kontak info
   - Site metadata

2. **about_content** - Konten halaman Tentang (untuk future)
   - Visi, misi, sejarah
   - Bisa dikelola dari admin

3. **bumdes_info** - Info BUMDes (untuk future)
   - Struktur organisasi
   - Program unggulan

4. **social_links** - Link media sosial (untuk future)
   - WhatsApp, Instagram, Facebook
   - Bisa dikelola dari admin

### Tabel Existing

- **products** - Data produk
- **messages** - Pesan dari form kontak
- **users** - User admin panel

## File yang Diubah

### Website Utama
- `js/supabase-public.js` - Tambah fungsi load settings
- `index.html` - Hero dinamis
- `kontak.html` - WhatsApp & email dinamis
- `css/style.css` - Hero background jadi inline style

### Admin Panel
- `src/pages/SiteSettingsPage.tsx` - Halaman baru untuk kelola settings
- `src/hooks/useSiteSettings.ts` - Hook untuk CRUD settings
- `src/App.tsx` - Route baru
- `src/components/layout/Sidebar.tsx` - Menu baru
- `src/lib/constants.ts` - Konstanta URL logo

## Testing

### Test Website Utama
1. Buka `index.html`
2. Cek hero background muncul
3. Cek produk muncul
4. Buka `kontak.html`
5. Isi form dan submit
6. Pastikan redirect ke WhatsApp dengan nomor benar

### Test Admin Panel
1. Login ke admin panel
2. Klik **Pengaturan Website**
3. Edit hero title
4. Klik **Simpan**
5. Refresh website utama
6. Pastikan perubahan muncul

### Test Form Kontak
1. Buka `kontak.html`
2. Isi form lengkap
3. Submit
4. Cek redirect ke WhatsApp
5. Login admin panel
6. Klik **Pesan Masuk**
7. Pastikan pesan tersimpan

## Keuntungan Sistem Dinamis

✅ **Tidak perlu edit kode** - Semua konten dikelola dari admin panel
✅ **Real-time update** - Perubahan langsung terlihat di website
✅ **Centralized** - Satu tempat untuk kelola semua konten
✅ **User-friendly** - Interface admin yang mudah digunakan
✅ **Scalable** - Mudah tambah konten baru di masa depan
✅ **Secure** - RLS policies melindungi data
✅ **Audit trail** - Timestamp untuk setiap perubahan

## Roadmap Future

- [ ] CRUD untuk halaman Tentang
- [ ] CRUD untuk info BUMDes
- [ ] CRUD untuk social media links
- [ ] Upload gambar langsung dari admin panel
- [ ] Preview perubahan sebelum publish
- [ ] Version history untuk rollback
- [ ] Multi-language support

## Support

Jika ada masalah:
1. Cek file `SETUP-DATABASE.md` untuk setup database
2. Cek browser console untuk error
3. Cek Supabase logs untuk error backend
4. Pastikan RLS policies aktif
5. Pastikan user sudah login sebagai admin

---

**Semua konten website sekarang dinamis dan mudah dikelola! 🎉**
