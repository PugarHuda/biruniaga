# 🚀 Deployment ke Vercel

Panduan lengkap deploy website Biruniaga ke Vercel dengan custom domain biruniaga.com dan admin.biruniaga.com.

---

## 🎯 Kenapa Vercel?

✅ **Gratis** untuk project seperti ini
✅ **Auto SSL** (HTTPS otomatis)
✅ **Auto Deploy** dari Git (push = deploy)
✅ **CDN Global** (website cepat di mana saja)
✅ **Zero Config** untuk React/Vite
✅ **Custom Domain** gratis
✅ **Subdomain** unlimited

---

## 📋 Persiapan

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Push Code ke GitHub
```bash
# Init git (jika belum)
git init
git add .
git commit -m "Initial commit"

# Buat repo di GitHub
# Lalu push
git remote add origin https://github.com/username/biruniaga.git
git push -u origin main
```

---

## 🌐 Deploy Website Utama (biruniaga.com)

### Step 1: Import Project ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik **Add New** → **Project**
4. Import repository Anda
5. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (root)
   - **Build Command:** (kosongkan)
   - **Output Directory:** `./` (root)
   - **Install Command:** (kosongkan)

6. Klik **Deploy**
7. Tunggu deploy selesai (1-2 menit)

### Step 2: Setup Custom Domain

1. Di Vercel Dashboard → Project → **Settings** → **Domains**
2. Tambahkan domain: `biruniaga.com`
3. Vercel akan kasih instruksi DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. Buka Hostinger Domain Management
5. Klik domain **biruniaga.com** → **DNS Records**
6. Tambahkan record sesuai instruksi Vercel
7. Tunggu propagasi DNS (5-30 menit)
8. Vercel akan auto-enable SSL

---

## 🔧 Deploy Admin Panel (admin.biruniaga.com)

### Step 1: Build Admin Panel

```bash
cd admin-panel
npm install
npm run build
```

### Step 2: Deploy ke Vercel

#### Option A: Via Vercel CLI
```bash
cd admin-panel
vercel

# Ikuti prompt:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? biruniaga-admin
# - Directory? ./
# - Override settings? No

# Deploy production
vercel --prod
```

#### Option B: Via GitHub (Recommended)

1. Buat folder baru di root project:
   ```bash
   mkdir admin-deploy
   cp -r admin-panel/dist/* admin-deploy/
   ```

2. Buat file `admin-deploy/vercel.json`:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

3. Push ke GitHub (branch terpisah atau repo terpisah)

4. Import ke Vercel:
   - Framework: Other
   - Root Directory: `admin-deploy`
   - Build Command: (kosongkan)
   - Output Directory: `./`

### Step 3: Setup Subdomain

1. Di Vercel Dashboard → Admin Project → **Settings** → **Domains**
2. Tambahkan domain: `admin.biruniaga.com`
3. Vercel akan kasih instruksi DNS:
   ```
   Type: CNAME
   Name: admin
   Value: cname.vercel-dns.com
   ```

4. Buka Hostinger Domain Management
5. Tambahkan CNAME record
6. Tunggu propagasi (5-30 menit)

---

## 🔧 Konfigurasi Vercel

### Website Utama (vercel.json)

Buat file `vercel.json` di root project:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://xjnlgscroleykailitat.supabase.co/:path*"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Admin Panel (admin-panel/vercel.json)

File sudah ada, pastikan isinya:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔒 Update Supabase CORS

Setelah deploy, update Supabase CORS:

1. Buka Supabase Dashboard
2. **Settings** → **API** → **CORS**
3. Tambahkan:
   ```
   https://biruniaga.com
   https://www.biruniaga.com
   https://admin.biruniaga.com
   ```

---

## 🔐 Update Google OAuth Redirect

1. Buka Google Cloud Console
2. **APIs & Services** → **Credentials**
3. Edit OAuth Client
4. Authorized redirect URIs, tambahkan:
   ```
   https://xjnlgscroleykailitat.supabase.co/auth/v1/callback
   ```
5. Authorized JavaScript origins, tambahkan:
   ```
   https://admin.biruniaga.com
   ```

---

## ✅ Testing

### Test Website Utama:
```
https://biruniaga.com
```
- [ ] Homepage muncul
- [ ] Hero background muncul
- [ ] Produk muncul
- [ ] Form kontak berfungsi
- [ ] SSL aktif (HTTPS)

### Test Admin Panel:
```
https://admin.biruniaga.com
```
- [ ] Login page muncul
- [ ] Login dengan Google berfungsi
- [ ] Dashboard muncul
- [ ] CRUD produk berfungsi
- [ ] Upload gambar berfungsi
- [ ] SSL aktif (HTTPS)

---

## 🔄 Auto Deploy

Setelah setup, setiap push ke GitHub akan auto-deploy:

```bash
# Edit file
git add .
git commit -m "Update content"
git push

# Vercel auto-deploy dalam 1-2 menit
```

---

## 📊 Struktur Deployment

```
Vercel Projects:
├── biruniaga (Website Utama)
│   ├── Domain: biruniaga.com
│   ├── Source: GitHub repo (root)
│   └── Files: HTML, CSS, JS
│
└── biruniaga-admin (Admin Panel)
    ├── Domain: admin.biruniaga.com
    ├── Source: GitHub repo (admin-panel/dist)
    └── Files: React build output
```

---

## 💰 Biaya

**Vercel Hobby (Free):**
- ✅ Unlimited projects
- ✅ Unlimited bandwidth
- ✅ Custom domains
- ✅ SSL certificates
- ✅ 100GB bandwidth/month
- ✅ Serverless functions

**Cukup untuk website seperti ini!**

---

## 🚨 Troubleshooting

### Domain Tidak Connect
- Tunggu 30 menit untuk DNS propagasi
- Cek DNS dengan: https://dnschecker.org
- Pastikan DNS record benar

### Admin Panel Blank
- Cek console browser (F12)
- Pastikan .env sudah benar
- Rebuild: `npm run build`
- Redeploy

### Google Login Tidak Berfungsi
- Cek redirect URI di Google Cloud
- Cek CORS di Supabase
- Cek console untuk error

---

## 🎉 Done!

Website dan admin panel sudah live di:
- **Website:** https://biruniaga.com
- **Admin:** https://admin.biruniaga.com

Auto-deploy aktif, tinggal push ke GitHub! 🚀
