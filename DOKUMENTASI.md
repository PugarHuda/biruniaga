# 📚 Dokumentasi Website Biruniaga

Dokumentasi lengkap untuk website dan admin panel BUMDes Biruniaga.

---

## 🚀 Quick Start

Baca file ini untuk memulai dengan cepat:

### **START-HERE.md** ⭐
Panduan tercepat untuk setup dan mulai menggunakan website + admin panel.

---

## 📖 Dokumentasi Utama

### 1. **SETUP-DATABASE.md**
Panduan setup database Supabase:
- Cara menjalankan SQL schema
- Struktur tabel
- Data default
- Verifikasi setup

### 2. **FITUR-DINAMIS.md**
Dokumentasi fitur konten dinamis:
- Hero section dinamis
- Produk dari database
- Form kontak → WhatsApp
- Admin panel CRUD

### 3. **DEPLOYMENT-CHECKLIST.md**
Checklist sebelum deploy ke production:
- Verifikasi database
- Test semua fitur
- Optimasi performa
- Security checklist

### 4. **QUICK-START.md**
Setup cepat 5 menit:
- Install dependencies
- Setup Supabase
- Test website
- Deploy

### 5. **FINAL-SUMMARY.md**
Summary lengkap implementasi:
- Fitur yang sudah dibuat
- Struktur database
- File-file penting
- Status project

---

## 📁 File SQL Penting

### **supabase-schema.sql**
Schema database lengkap untuk membuat tabel baru:
- `site_settings` - Settings website
- `about_content` - Konten halaman Tentang
- `bumdes_info` - Info BUMDes
- `social_links` - Link media sosial
- `products` - Produk (sudah ada)
- `messages` - Pesan kontak (sudah ada)
- `admins` - Admin users (sudah ada)

### **supabase-update-data.sql**
Update data tanpa membuat tabel baru (aman dijalankan berkali-kali):
- Update URL gambar
- Update konten default
- Update settings

---

## 🎯 Struktur Project

```
website-bisnis-banyubiru/
├── index.html              # Homepage
├── produk.html             # Halaman semua produk
├── produk-unggulan.html    # Halaman produk featured
├── detail-produk.html      # Detail produk
├── kontak.html             # Form kontak
├── tentang.html            # Tentang desa
├── bumdes.html             # Tentang BUMDes
│
├── css/                    # Stylesheets
│   ├── style.css
│   ├── layout.css
│   ├── navbar.css
│   └── ...
│
├── js/                     # JavaScript
│   ├── supabase-public.js  # Supabase client
│   └── ui.js               # UI utilities
│
├── assets/                 # Static assets
│   └── img/
│
├── admin-panel/            # React Admin Panel
│   ├── src/
│   │   ├── pages/          # Admin pages
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
│   └── dist/               # Build output
│
└── docs/                   # Dokumentasi (file .md)
```

---

## 🔧 Admin Panel

### Halaman Admin:
1. **Dashboard** - Overview statistik
2. **Produk** - CRUD produk
3. **Pesan Masuk** - Lihat pesan dari form kontak
4. **Users** - Kelola admin users
5. **Pengaturan Website** ⭐ - Edit konten dinamis:
   - Logo BUMDes & Desa
   - Hero section (title, subtitle, background)
   - Kontak (WhatsApp, email, alamat)
   - Footer copyright
   - Meta tags (SEO)

### Tech Stack:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase Client

---

## 📱 Fitur Website

### Website Utama:
✅ Hero section dinamis dari database
✅ Produk dinamis dari database
✅ Filter & sort produk
✅ Detail produk
✅ Form kontak → save database + redirect WhatsApp
✅ Responsive design
✅ Animasi scroll (IntersectionObserver)
✅ SEO optimized

### Admin Panel:
✅ Login/Register dengan approval
✅ Role-based access (admin, editor, viewer)
✅ CRUD produk dengan upload gambar
✅ Lihat & kelola pesan
✅ Kelola users
✅ Edit settings website tanpa edit kode

---

## 🗄️ Database Tables

### Tabel Utama:
1. **products** - Data produk
2. **messages** - Pesan dari form kontak
3. **admins** - Admin users
4. **site_settings** - Settings website (logo, hero, kontak)
5. **about_content** - Konten halaman Tentang
6. **bumdes_info** - Info BUMDes
7. **social_links** - Link media sosial

---

## 🚀 Deployment

### Website Utama:
- Upload semua file HTML, CSS, JS ke hosting
- Pastikan Supabase URL & Key sudah benar di `js/supabase-public.js`

### Admin Panel:
```bash
cd admin-panel
npm run build
# Upload folder dist/ ke hosting
```

### Supabase:
- Database sudah setup
- Storage bucket `product-images` sudah ada
- RLS policies sudah dikonfigurasi

---

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Cek dokumentasi di folder ini
2. Cek console browser untuk error
3. Cek Supabase logs

---

## ✅ Status Project

**Website:** ✅ Production Ready
**Admin Panel:** ✅ Production Ready
**Database:** ✅ Setup Complete
**Documentation:** ✅ Complete

Semua fitur sudah berfungsi dan siap deploy! 🎉
