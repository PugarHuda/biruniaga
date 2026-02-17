# Website Biruniaga - BUMDes Banyubiru

Website resmi BUMDes Banyubiru untuk pemasaran produk UMKM unggulan Desa Banyubiru, Kec. Dukun, Kab. Magelang, Jawa Tengah.

## Live URLs

| Layanan | URL |
|---------|-----|
| Website Utama | https://biruniaga.site |
| Admin Panel | https://admin.biruniaga.site |
| Repository | https://github.com/PugarHuda/biruniaga |

---

## Akun Admin

| Field | Value |
|-------|-------|
| Email | `adminutama@biruniaga.com` |
| Password | `biru45niaga45` |
| Role | Admin (akses penuh) |

---

## Struktur Project

```
website-bisnis-banyubiru/
├── index.html              # Halaman Beranda
├── tentang.html            # Halaman Tentang Desa
├── bumdes.html             # Halaman Profil BUMDes
├── produk.html             # Halaman Katalog Produk
├── produk-unggulan.html    # Halaman Produk Unggulan
├── detail-produk.html      # Halaman Detail Produk
├── kontak.html             # Halaman Kontak & Form Pesan
├── css/                    # Stylesheet
├── js/
│   ├── supabase-public.js  # Koneksi Supabase & helper
│   └── ui.js               # Interaksi UI (menu, scroll, animasi)
├── assets/img/             # Gambar lokal
├── admin-panel/            # Admin Panel (React + Vite + TypeScript)
│   ├── src/
│   │   ├── pages/          # Halaman admin (Dashboard, Produk, Pesan, dll)
│   │   ├── components/     # Komponen UI
│   │   ├── hooks/          # Custom hooks (CRUD operations)
│   │   ├── context/        # AuthContext (autentikasi)
│   │   └── lib/            # Supabase client, constants, utils
│   ├── .env                # Environment variables (tidak di-commit)
│   └── vercel.json         # Konfigurasi Vercel (SPA rewrite)
├── vercel.json             # Konfigurasi Vercel (website utama)
├── supabase-schema.sql     # Schema database
└── supabase-update-data.sql # Data awal
```

---

## Alur Penggunaan

### A. Pengunjung (Website Publik)

```
Beranda ──> Lihat Produk Unggulan
  │
  ├── Tentang ──> Profil Desa Banyubiru (sejarah, visi misi, geografis)
  │
  ├── BUMDes ──> Profil BUMDes Biruniaga (misi, program)
  │
  ├── Produk ──> Katalog Semua Produk
  │     │
  │     ├── Filter: Cemilan / Olahan / Makanan
  │     ├── Urutkan: Nama A-Z, Harga Termurah/Termahal
  │     │
  │     └── Klik Produk ──> Detail Produk
  │           │
  │           ├── Info: gambar, harga, kategori, deskripsi
  │           ├── Spesifikasi: bahan, berat, masa simpan
  │           ├── Produk terkait (kategori sama)
  │           │
  │           └── [Pesan Sekarang] ──> Buka WhatsApp
  │                 (pesan otomatis terisi nama produk & harga)
  │
  └── Kontak ──> Form Hubungi Kami
        │
        ├── Isi: nama, email, telepon, subjek, pesan
        ├── Kirim ──> Tersimpan di database + buka WhatsApp
        │
        ├── Info kontak (telepon, email, alamat, jam operasional)
        └── Lokasi Google Maps
```

**Cara pesan produk:**
1. Buka halaman **Produk** atau **Produk Unggulan**
2. Klik produk yang diinginkan
3. Di halaman detail, klik tombol **Pesan Sekarang**
4. WhatsApp terbuka otomatis dengan pesan berisi nama produk dan harga
5. Lanjutkan negosiasi langsung dengan admin

---

### B. Admin Panel

```
Login (/login)
  │
  ├── [Belum punya akun?] ──> Register (/register)
  │     └── Akun baru = role "pending" (tunggu disetujui admin)
  │
  └── [Login berhasil] ──> Dashboard (/dashboard)
        │
        ├── Dashboard ──> Ringkasan statistik
        │     ├── Total produk & produk aktif
        │     ├── Total pesan & pesan belum dibaca
        │     ├── 10 produk terbaru
        │     ├── 5 pesan terbaru
        │     └── Daftar admin
        │
        ├── Produk (/produk) ──> Kelola Produk
        │     ├── Tambah produk baru (+ upload gambar)
        │     ├── Edit produk
        │     ├── Hapus produk
        │     ├── Aktifkan / Nonaktifkan produk
        │     ├── Tandai sebagai produk unggulan
        │     └── Cari & filter (kategori: Cemilan, Olahan, Makanan)
        │
        ├── Pesan (/pesan) ──> Kelola Pesan Masuk
        │     ├── Lihat semua pesan dari form kontak
        │     ├── Tandai sudah dibaca / belum dibaca
        │     ├── Balas via WhatsApp (tombol langsung)
        │     ├── Hapus pesan
        │     └── Filter: semua / belum dibaca / sudah dibaca
        │
        ├── Pengaturan (/pengaturan) ──> Pengaturan Website
        │     ├── Logo & Branding
        │     │     ├── Upload logo BUMDes
        │     │     └── Upload logo Desa
        │     ├── Hero Section (Beranda)
        │     │     ├── Gambar background hero
        │     │     ├── Judul, subjudul, deskripsi
        │     ├── Informasi Kontak
        │     │     ├── Nomor WhatsApp
        │     │     ├── Email
        │     │     └── Alamat
        │     └── SEO & Footer
        │           ├── Judul website (title tag)
        │           ├── Deskripsi website (meta description)
        │           └── Teks copyright footer
        │
        └── Pengguna (/pengguna) ──> Kelola Admin [KHUSUS ADMIN]
              ├── Lihat semua akun admin
              ├── Setujui akun baru (ubah dari "pending" ke role lain)
              ├── Ubah role pengguna
              └── Hapus akun pengguna
```

---

### C. Sistem Role Admin

| Role | Dashboard | Produk | Pesan | Pengaturan | Pengguna |
|------|-----------|--------|-------|------------|----------|
| **Admin** | Lihat | Kelola | Kelola | Kelola | Kelola |
| **Editor** | Lihat | Kelola | Kelola | Kelola | Tidak bisa akses |
| **Viewer** | Lihat | Lihat saja | Lihat saja | Lihat saja | Tidak bisa akses |
| **Pending** | Tidak bisa login | - | - | - | - |

**Alur pendaftaran admin baru:**
1. Buka https://admin.biruniaga.site/register
2. Isi nama, email, password
3. Akun terbuat dengan status **pending**
4. Admin utama login, buka halaman **Pengguna**
5. Ubah role dari "Menunggu" ke Admin/Editor/Viewer
6. Pengguna baru sekarang bisa login

---

## Database (Supabase)

### Tabel Utama

| Tabel | Fungsi |
|-------|--------|
| `products` | Katalog produk (nama, harga, kategori, gambar, status, unggulan) |
| `messages` | Pesan masuk dari form kontak |
| `admins` | Akun admin (terhubung ke Supabase Auth) |
| `site_settings` | Pengaturan website (logo, hero, kontak, SEO) |
| `about_content` | Konten halaman Tentang Desa |
| `bumdes_info` | Konten halaman Profil BUMDes |
| `social_links` | Link media sosial |

### Kategori Produk

- **Cemilan** - Keripik, snack, dll
- **Olahan** - Produk olahan (abon, dll)
- **Makanan** - Makanan siap saji

### Status Produk

- **active** - Tampil di website publik
- **inactive** - Tersembunyi dari pengunjung, hanya terlihat di admin

---

## Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Website Utama | HTML, CSS, JavaScript (vanilla) |
| Admin Panel | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| Backend & Auth | Supabase (PostgreSQL + Auth + Storage) |
| Hosting | Vercel |
| Domain & DNS | Hostinger |
| Integrasi | WhatsApp Web API, Google Maps Embed |

---

## Development (Lokal)

### Website Utama

Buka `index.html` langsung di browser atau gunakan Live Server (VS Code extension).

### Admin Panel

```bash
cd admin-panel
npm install
npm run dev
```

Buka http://localhost:5173

### Environment Variables (admin-panel/.env)

```env
VITE_SUPABASE_URL=https://xjnlgscroleykailitat.supabase.co
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
VITE_MAIN_SITE_URL=https://biruniaga.site
```

---

## Deployment

### Arsitektur Deploy

```
GitHub Repo (PugarHuda/biruniaga)
  │
  ├── Vercel Project: biruniaga
  │     Root Directory: /
  │     Domain: biruniaga.site, www.biruniaga.site
  │
  └── Vercel Project: biruniaga-admin
        Root Directory: /admin-panel
        Domain: admin.biruniaga.site
        Env Vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_MAIN_SITE_URL
```

### DNS Records (Hostinger)

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |
| CNAME | admin | cname.vercel-dns.com |

### Deploy Ulang

```bash
# Website utama
vercel deploy --prod

# Admin panel
cd admin-panel
vercel deploy --prod
```

Atau push ke GitHub — Vercel auto-deploy dari branch `master`.

---

## Troubleshooting

### Admin tidak bisa login

```sql
-- 1. Pastikan RLS disabled untuk tabel admins
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- 2. Konfirmasi email user
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- 3. Pastikan role bukan "pending"
UPDATE admins SET role = 'admin' WHERE email = 'adminutama@biruniaga.com';
```

### Produk tidak muncul di website

- Pastikan status produk = **active** (bukan inactive)
- Cek koneksi Supabase di browser console (F12)

### Gambar produk tidak muncul

- Pastikan bucket `product-images` di Supabase Storage bersifat **public**
- Cek apakah file berhasil terupload di Supabase Dashboard > Storage

### Build error admin panel

```bash
cd admin-panel
rm -rf node_modules
npm install
npm run build
```
