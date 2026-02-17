# Setup Database Supabase

## Langkah 1: Jalankan SQL Schema

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **SQL Editor** di sidebar kiri
4. Klik **New Query**
5. Copy seluruh isi file `supabase-schema.sql`
6. Paste ke SQL Editor
7. Klik **Run** atau tekan `Ctrl+Enter`

## Langkah 2: Verifikasi Tabel Berhasil Dibuat

Klik **Table Editor** di sidebar, pastikan tabel berikut sudah ada:
- `site_settings` - Pengaturan website (logo, hero, kontak, dll)
- `about_content` - Konten halaman Tentang
- `bumdes_info` - Informasi BUMDes
- `social_links` - Link media sosial

## Langkah 3: Cek Data Default

Buka tabel `site_settings`, pastikan ada data default seperti:
- `logo_bumdes_url`
- `hero_image_url`
- `whatsapp_number` (default: +6283119013471)
- `hero_title`
- `hero_description`
- dll.

## Langkah 4: Update Nomor WhatsApp

Jika nomor WhatsApp berbeda, update di tabel `site_settings`:

```sql
UPDATE site_settings 
SET value = '+6283119013471' 
WHERE key = 'whatsapp_number';
```

## Langkah 5: Upload Gambar ke Storage (Jika Belum)

Jika gambar logo dan hero belum diupload:

1. Klik **Storage** di sidebar
2. Pilih bucket `images`
3. Buka folder `site`
4. Upload file:
   - `logo-bumdes.png`
   - `logo-desa.png`
   - `desa-banyu.png`
5. Copy URL public untuk setiap file
6. Update di tabel `site_settings`

## Langkah 6: Test di Website

1. Buka website utama (index.html)
2. Pastikan:
   - Hero background muncul
   - Logo muncul di navbar
   - Produk muncul dari database
3. Buka halaman Kontak
4. Klik tombol WhatsApp, pastikan nomor benar

## Langkah 7: Test di Admin Panel

1. Login ke admin panel
2. Klik menu **Pengaturan Website**
3. Coba edit salah satu setting (misal: hero_title)
4. Klik **Simpan**
5. Refresh website utama, pastikan perubahan muncul

## Troubleshooting

### Gambar tidak muncul
- Cek URL di tabel `site_settings` apakah benar
- Pastikan file ada di Supabase Storage
- Cek browser console untuk error

### WhatsApp tidak berfungsi
- Pastikan format nomor: `+6283119013471` (dengan +62)
- Cek di tabel `site_settings` key `whatsapp_number`

### Error saat save di admin
- Cek RLS policies sudah aktif
- Pastikan user sudah login sebagai admin
- Cek browser console untuk error detail

## Struktur Data

### site_settings
```
key                 | value                                    | description
--------------------|------------------------------------------|---------------------------
logo_bumdes_url     | https://...storage.../logo-bumdes.png   | URL logo BUMDes
hero_image_url      | https://...storage.../desa-banyu.png    | URL gambar hero background
hero_title          | Dari Desa, Untuk Pasar Lebih Luas       | Judul hero section
hero_description    | Mendorong pertumbuhan ekonomi desa...    | Deskripsi hero section
whatsapp_number     | +6283119013471                           | Nomor WhatsApp untuk kontak
email               | nirmalabirub@gmail.com                   | Email kontak
address             | Dusun Wates, Desa Banyubiru...           | Alamat lengkap
```

Semua konten website sekarang bisa dikelola dari admin panel tanpa perlu edit kode!
