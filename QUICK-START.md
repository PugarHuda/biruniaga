# Quick Start Guide - Konten Dinamis

## 🚀 Setup dalam 5 Menit

### 1. Setup Database (2 menit)
```bash
1. Buka https://supabase.com/dashboard
2. Pilih project Anda
3. Klik "SQL Editor" di sidebar
4. Klik "New Query"
5. Copy SEMUA isi file: supabase-schema.sql
6. Paste ke editor
7. Klik "Run" (atau Ctrl+Enter)
8. Tunggu sampai selesai (muncul "Success")
```

### 2. Verifikasi Database (1 menit)
```bash
1. Klik "Table Editor" di sidebar
2. Pastikan ada 4 tabel baru:
   ✓ site_settings
   ✓ about_content
   ✓ bumdes_info
   ✓ social_links
3. Klik tabel "site_settings"
4. Pastikan ada data (12 rows)
5. Cek row dengan key "whatsapp_number"
   → Value harus: +6283119013471
```

### 3. Test Website (1 menit)
```bash
1. Buka index.html di browser
2. Cek:
   ✓ Hero background muncul
   ✓ Produk muncul (3 produk featured)
3. Buka kontak.html
4. Scroll ke bawah
5. Klik tombol "Chat via WhatsApp"
6. Pastikan nomor benar: +6283119013471
```

### 4. Test Admin Panel (1 menit)
```bash
1. Buka admin panel di browser
2. Login dengan akun admin
3. Lihat menu sidebar kiri
4. Pastikan ada menu baru: "Pengaturan Website" (icon globe)
5. Klik menu tersebut
6. Pastikan halaman load tanpa error
7. Lihat 4 section:
   - Logo & Gambar
   - Hero Section
   - Informasi Kontak
   - Informasi Website
```

### 5. Test Edit Konten (1 menit)
```bash
1. Di halaman "Pengaturan Website"
2. Scroll ke section "Hero Section"
3. Edit field "Judul hero section"
4. Ubah jadi: "Selamat Datang di Biruniaga"
5. Klik tombol "Simpan" di sebelah kanan
6. Tunggu notifikasi "Pengaturan berhasil diperbarui"
7. Buka tab baru → index.html
8. Refresh (F5)
9. Pastikan judul hero berubah
```

## ✅ Checklist Selesai

- [ ] SQL schema sudah dijalankan
- [ ] 4 tabel baru sudah ada
- [ ] Data default sudah terisi
- [ ] Website utama load tanpa error
- [ ] Hero background muncul
- [ ] Produk muncul
- [ ] WhatsApp button berfungsi
- [ ] Admin panel load tanpa error
- [ ] Menu "Pengaturan Website" ada
- [ ] Bisa edit dan save setting
- [ ] Perubahan muncul di website

## 🎯 Fitur yang Bisa Dikelola

### Dari Admin Panel → Pengaturan Website

1. **Logo & Gambar**
   - URL logo BUMDes
   - URL logo Desa
   - URL hero background

2. **Hero Section**
   - Judul (muncul di homepage)
   - Subjudul
   - Deskripsi

3. **Kontak**
   - Nomor WhatsApp: +6283119013471
   - Email
   - Alamat

4. **Website Info**
   - Site title (untuk SEO)
   - Site description (untuk SEO)
   - Footer copyright

## 🔥 Tips

### Update Nomor WhatsApp
```
1. Admin Panel → Pengaturan Website
2. Scroll ke "Informasi Kontak"
3. Edit "Nomor WhatsApp untuk kontak"
4. Format: +62831... (harus pakai +62)
5. Klik Simpan
6. Test di kontak.html
```

### Update Hero Background
```
1. Upload gambar baru ke Supabase Storage
2. Copy URL public
3. Admin Panel → Pengaturan Website
4. Paste URL di "URL gambar hero background"
5. Klik Simpan
6. Refresh website
```

### Lihat Pesan dari Form Kontak
```
1. Admin Panel → Pesan Masuk
2. Lihat semua pesan yang masuk
3. Badge merah = jumlah pesan belum dibaca
4. Klik pesan untuk mark as read
5. Bisa delete pesan yang tidak perlu
```

## 📱 Test Form Kontak

```bash
1. Buka kontak.html
2. Isi form:
   - Nama: Test User
   - Email: test@email.com
   - No. Telepon: 08123456789
   - Subjek: Pemesanan Produk
   - Pesan: Test pesan
3. Klik "Kirim Pesan"
4. Harus:
   ✓ Redirect ke WhatsApp
   ✓ Nomor benar: +6283119013471
   ✓ Pesan terformat rapi
5. Login admin panel
6. Klik "Pesan Masuk"
7. Pesan harus tersimpan
```

## 🐛 Troubleshooting Cepat

### Gambar tidak muncul
```sql
-- Cek URL di database
SELECT key, value FROM site_settings WHERE key LIKE '%url%';
```

### WhatsApp salah nomor
```sql
-- Update nomor
UPDATE site_settings 
SET value = '+6283119013471' 
WHERE key = 'whatsapp_number';
```

### Error saat save
- Cek user sudah login
- Cek browser console (F12)
- Cek Supabase logs

## 📚 Dokumentasi Lengkap

- `SETUP-DATABASE.md` - Setup database detail
- `FITUR-DINAMIS.md` - Dokumentasi lengkap fitur
- `SUMMARY-IMPLEMENTASI.md` - Summary implementasi

## 🎉 Selesai!

Sekarang semua konten website bisa dikelola dari admin panel tanpa perlu edit kode!

**Nomor WhatsApp: +6283119013471** ✅
