# 🏢 Website BUMDes Banyubiru

Website resmi BUMDes Banyubiru dengan admin panel untuk manajemen konten.

---

## 📁 Struktur Project

```
website-bisnis-banyubiru/
├── admin-panel/          # Admin panel (React + Vite)
├── assets/               # Gambar dan asset website
├── css/                  # Stylesheet website
├── js/                   # JavaScript website
├── *.html               # Halaman website utama
├── supabase-schema.sql  # Database schema
└── README.md            # Dokumentasi ini
```

---

## 🚀 Quick Start

### Website Utama (Development)

Website utama adalah static HTML, buka langsung di browser:

```bash
# Buka index.html di browser
# Atau gunakan live server
```

### Admin Panel (Development)

```bash
cd admin-panel
npm install
npm run dev
```

Buka http://localhost:5173

**Login:**
- Email: admin@biruniaga.com
- Password: [Password yang di-set di Supabase]

---

## 🗄️ Database Setup

### 1. Buat Project di Supabase

1. Buka https://supabase.com
2. Create new project
3. Catat URL dan Anon Key

### 2. Jalankan SQL Schema

1. Buka Supabase Dashboard → SQL Editor
2. Copy-paste isi file `supabase-schema.sql`
3. Run
4. Copy-paste isi file `supabase-update-data.sql`
5. Run

### 3. Disable RLS untuk Tabel Admins

```sql
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
```

### 4. Disable Email Confirmation

1. Supabase Dashboard → Authentication → Providers → Email
2. Toggle OFF "Confirm email"
3. Save

### 5. Confirm Semua User

```sql
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
```

---

## ⚙️ Configuration

### Admin Panel Environment Variables

File: `admin-panel/.env`

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MAIN_SITE_URL=https://biruniaga.com
```

---

## 🌐 Deployment

### Deploy ke Vercel

**Website Utama:**

1. Push ke GitHub
2. Import ke Vercel
3. Framework: Other
4. Root: `./`
5. Deploy

**Admin Panel:**

1. Push ke GitHub (repo terpisah)
2. Import ke Vercel
3. Framework: Vite
4. Root: `./`
5. Add environment variables (3 variables)
6. Deploy

### Setup Custom Domain

**DNS Records di Hostinger:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

### Update Supabase CORS

Supabase Dashboard → Settings → API → CORS Configuration:

```
https://biruniaga.com
https://www.biruniaga.com
https://admin.biruniaga.com
```

---

## 📚 Dokumentasi Lengkap

- **DEPLOY-STEP-BY-STEP.md** - Panduan deployment lengkap
- **DOKUMENTASI.md** - Dokumentasi fitur dan struktur
- **SETUP-DATABASE.md** - Setup database Supabase
- **DEPLOYMENT-CHECKLIST.md** - Checklist deployment
- **QUICK-START.md** - Quick start guide

---

## 🔧 Troubleshooting

### Admin tidak bisa login

**Solusi:**

```sql
-- Disable RLS
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Confirm email
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Update role ke admin
UPDATE admins 
SET role = 'admin' 
WHERE email = 'admin@biruniaga.com';
```

### Build error

```bash
cd admin-panel
rm -rf node_modules
npm install
npm run build
```

---

## 📞 Support

Jika ada masalah, cek dokumentasi lengkap di folder project atau hubungi developer.

---

## 🎉 Live URLs

- **Website:** https://biruniaga.com
- **Admin Panel:** https://admin.biruniaga.com

---

**Dibuat dengan ❤️ untuk BUMDes Banyubiru**
