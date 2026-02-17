# Deployment Checklist

## Pre-Deployment

### Database
- [ ] SQL schema sudah dijalankan di Supabase
- [ ] 4 tabel baru sudah ada (site_settings, about_content, bumdes_info, social_links)
- [ ] Data default sudah terisi
- [ ] RLS policies aktif
- [ ] Nomor WhatsApp sudah benar: **+6283119013471**

### Gambar & Assets
- [ ] Semua gambar produk sudah diupload ke Supabase Storage
- [ ] Logo BUMDes sudah diupload
- [ ] Logo Desa sudah diupload
- [ ] Hero background sudah diupload
- [ ] URL gambar sudah diupdate di tabel site_settings

### Testing Lokal
- [ ] Website utama load tanpa error
- [ ] Hero background muncul
- [ ] Produk muncul dari database
- [ ] Form kontak berfungsi
- [ ] WhatsApp redirect benar
- [ ] Admin panel load tanpa error
- [ ] Menu "Pengaturan Website" berfungsi
- [ ] Bisa edit dan save settings

## Deployment Website Utama

### File yang Perlu Diupload
```
Root Directory:
├── index.html
├── tentang.html
├── bumdes.html
├── produk.html
├── produk-unggulan.html
├── detail-produk.html
├── kontak.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── style.css
│   ├── layout.css
│   ├── navbar.css
│   ├── footer.css
│   ├── produk.css
│   ├── responsive.css
│   └── section-transitions.css
├── js/
│   ├── ui.js
│   └── supabase-public.js
└── assets/
    └── img/
        └── (optional - gambar backup)
```

### Langkah Upload
1. [ ] Compress folder website ke ZIP
2. [ ] Upload ke hosting (cPanel/FTP/Vercel/Netlify)
3. [ ] Extract di public_html atau root directory
4. [ ] Set permissions jika perlu (755 untuk folder, 644 untuk file)

### Verifikasi Website
- [ ] Buka domain di browser
- [ ] Test semua halaman:
  - [ ] index.html (homepage)
  - [ ] tentang.html
  - [ ] bumdes.html
  - [ ] produk.html
  - [ ] produk-unggulan.html
  - [ ] detail-produk.html
  - [ ] kontak.html
- [ ] Cek hero background muncul
- [ ] Cek produk load dari database
- [ ] Test form kontak
- [ ] Test WhatsApp button
- [ ] Test responsive (mobile, tablet, desktop)

## Deployment Admin Panel

### Build Admin Panel
```bash
cd admin-panel
npm install
npm run build
```

### File yang Diupload
```
Upload folder: admin-panel/dist/
Ke subdomain atau subfolder: /admin-panel/
```

### Langkah Upload
1. [ ] Build admin panel: `npm run build`
2. [ ] Folder `dist/` akan berisi file production
3. [ ] Upload isi folder `dist/` ke hosting
4. [ ] Bisa di subdomain: admin.domain.com
5. [ ] Atau subfolder: domain.com/admin-panel/

### Verifikasi Admin Panel
- [ ] Buka URL admin panel
- [ ] Test login
- [ ] Test semua menu:
  - [ ] Dashboard
  - [ ] Produk
  - [ ] Pesan Masuk
  - [ ] Pengaturan Website (BARU)
  - [ ] Pengguna
  - [ ] Pengaturan
- [ ] Test CRUD produk
- [ ] Test edit settings
- [ ] Test lihat pesan

## Post-Deployment

### Testing Production
- [ ] Test website dari berbagai device
- [ ] Test form kontak production
- [ ] Test WhatsApp redirect
- [ ] Test admin panel production
- [ ] Test edit settings dari admin
- [ ] Verifikasi perubahan muncul di website

### SEO & Performance
- [ ] Submit sitemap.xml ke Google Search Console
- [ ] Test page speed (GTmetrix, PageSpeed Insights)
- [ ] Test mobile-friendly (Google Mobile-Friendly Test)
- [ ] Cek meta tags (title, description, og:image)

### Security
- [ ] HTTPS aktif (SSL certificate)
- [ ] Supabase RLS policies aktif
- [ ] Admin panel hanya bisa diakses user terdaftar
- [ ] Backup database

### Monitoring
- [ ] Setup Google Analytics (optional)
- [ ] Monitor Supabase usage
- [ ] Monitor error logs
- [ ] Test form kontak berkala

## Configuration

### Environment Variables (Admin Panel)
```env
VITE_SUPABASE_URL=https://xjnlgscroleykailitat.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Supabase Settings
- [ ] RLS policies enabled
- [ ] Storage bucket `images` public
- [ ] CORS configured untuk domain production

### DNS Settings (Jika Pakai Custom Domain)
```
Type    Name            Value
A       @               [IP Server]
A       www             [IP Server]
CNAME   admin           [Hosting Admin]
```

## Backup

### Database Backup
```bash
# Via Supabase Dashboard
1. Project Settings → Database
2. Klik "Backup"
3. Download SQL dump
```

### File Backup
- [ ] Backup semua file website
- [ ] Backup folder admin-panel/dist
- [ ] Backup .env file
- [ ] Simpan di cloud storage

## Rollback Plan

### Jika Ada Masalah
1. [ ] Restore database dari backup
2. [ ] Restore file website dari backup
3. [ ] Clear browser cache
4. [ ] Test ulang

### Emergency Contact
- Supabase Support: https://supabase.com/support
- Hosting Support: [Contact hosting provider]

## Final Checklist

- [ ] Website utama online dan berfungsi
- [ ] Admin panel online dan berfungsi
- [ ] Database terkoneksi
- [ ] Gambar semua muncul
- [ ] Form kontak berfungsi
- [ ] WhatsApp redirect benar: **+6283119013471**
- [ ] HTTPS aktif
- [ ] Mobile responsive
- [ ] SEO meta tags OK
- [ ] Backup sudah dibuat

## 🎉 Deployment Complete!

Website dan admin panel sudah online dan siap digunakan!

### URLs
- Website: https://your-domain.com
- Admin Panel: https://your-domain.com/admin-panel
- WhatsApp: https://wa.me/6283119013471

### Credentials
- Admin email: [your-admin-email]
- Admin password: [your-admin-password]

### Support
- Dokumentasi: Lihat file FITUR-DINAMIS.md
- Quick Start: Lihat file QUICK-START.md
- Setup Database: Lihat file SETUP-DATABASE.md

---

**Semua sistem sudah berjalan! Selamat! 🚀**
