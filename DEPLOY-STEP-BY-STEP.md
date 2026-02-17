# 🚀 Deploy Step by Step - Copy Paste Aja!

Ikuti langkah ini satu per satu. Tinggal copy-paste command!

---

## 📋 PART 1: Setup Git & Push ke GitHub

### Step 1: Init Git untuk Website Utama

Buka terminal di folder project, jalankan:

```bash
git init
git add .
git commit -m "Initial commit - Website Biruniaga"
```

### Step 2: Buat Repo di GitHub untuk Website Utama

1. Buka https://github.com/new
2. Repository name: `website-biruniaga`
3. Description: `Website Biruniaga - BUMDes Banyubiru`
4. Public atau Private: **Public**
5. **JANGAN centang** "Add a README file"
6. Klik **Create repository**

### Step 3: Push Website Utama ke GitHub

GitHub akan kasih command, tapi pakai ini aja (ganti USERNAME dengan username GitHub kamu):

```bash
git remote add origin https://github.com/USERNAME/website-biruniaga.git
git branch -M main
git push -u origin main
```

**Contoh:** Jika username kamu `johndoe`:
```bash
git remote add origin https://github.com/johndoe/website-biruniaga.git
git branch -M main
git push -u origin main
```

### Step 4: Init Git untuk Admin Panel

Buka terminal di folder `admin-panel`, jalankan:

```bash
cd admin-panel
git init
git add .
git commit -m "Initial commit - Admin Panel Biruniaga"
```

### Step 5: Buat Repo di GitHub untuk Admin Panel

1. Buka https://github.com/new
2. Repository name: `admin-biruniaga`
3. Description: `Admin Panel Biruniaga - BUMDes Banyubiru`
4. Public atau Private: **Public**
5. **JANGAN centang** "Add a README file"
6. Klik **Create repository**

### Step 6: Push Admin Panel ke GitHub

Ganti USERNAME dengan username GitHub kamu:

```bash
git remote add origin https://github.com/USERNAME/admin-biruniaga.git
git branch -M main
git push -u origin main
```

---

## 🌐 PART 2: Deploy Website Utama ke Vercel

### Step 1: Login ke Vercel

1. Buka https://vercel.com
2. Klik **Sign Up** atau **Log In**
3. Pilih **Continue with GitHub**
4. Authorize Vercel

### Step 2: Import Project

1. Di Vercel Dashboard, klik **Add New...** → **Project**
2. Klik **Import Git Repository**
3. Cari repo `website-biruniaga`
4. Klik **Import**

### Step 3: Configure Project

**Framework Preset:** Other

**Root Directory:** `./` (default, jangan diubah)

**Build Command:** (kosongkan)

**Output Directory:** `./` (default, jangan diubah)

**Install Command:** (kosongkan)

Klik **Deploy**

### Step 4: Tunggu Deploy Selesai

Tunggu 1-2 menit. Vercel akan kasih URL temporary seperti:
```
https://website-biruniaga.vercel.app
```

Buka URL tersebut untuk test. Jika website muncul, berarti berhasil! ✅

### Step 5: Setup Custom Domain

1. Di project page, klik **Settings** (tab atas)
2. Klik **Domains** (sidebar kiri)
3. Di bagian "Add Domain", ketik: `biruniaga.com`
4. Klik **Add**
5. Vercel akan kasih instruksi DNS. **CATAT INI:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 6: Setup DNS di Hostinger

1. Login ke Hostinger: https://hpanel.hostinger.com
2. Di dashboard, cari domain `biruniaga.com`
3. Klik **Manage**
4. Klik **DNS / Name Servers** (di sidebar)
5. **HAPUS semua record A dan CNAME yang ada** (kecuali MX record untuk email)
6. Klik **Add Record** atau **Manage**

**Tambah Record 1:**
- Type: `A`
- Name: `@` (atau kosongkan)
- Points to: `76.76.21.21`
- TTL: `14400` (atau biarkan default)
- Klik **Add Record** atau **Save**

**Tambah Record 2:**
- Type: `CNAME`
- Name: `www`
- Points to: `cname.vercel-dns.com`
- TTL: `14400` (atau biarkan default)
- Klik **Add Record** atau **Save**

### Step 7: Verifikasi

1. Tunggu 5-10 menit untuk DNS propagate
2. Buka https://biruniaga.com
3. Jika website muncul, berarti berhasil! 🎉

**Jika belum muncul:**
- Tunggu 10-30 menit lagi
- Clear browser cache (Ctrl+Shift+Delete)
- Test di browser lain atau incognito
- Cek DNS di https://dnschecker.org

---

## 🔐 PART 3: Deploy Admin Panel ke Vercel

### Step 1: Import Project

1. Di Vercel Dashboard, klik **Add New...** → **Project**
2. Klik **Import Git Repository**
3. Cari repo `admin-biruniaga`
4. Klik **Import**

### Step 2: Configure Project

**Framework Preset:** Vite

**Root Directory:** `./` (default, jangan diubah)

**Build Command:** `npm run build` (auto-detect)

**Output Directory:** `dist` (auto-detect)

**Install Command:** `npm install` (auto-detect)

### Step 3: Add Environment Variables

Klik **Environment Variables** (expand)

**Tambah 3 variables:**

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://xjnlgscroleykailitat.supabase.co`
- Klik **Add**

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqbmxnc2Nyb2xleWthaWxpdGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTgzOTEsImV4cCI6MjA4NjczNDM5MX0.STViYUShxpdL-Z0RbNuNT-4HvxeO8uP74QlCNNHnHrw`
- Klik **Add**

**Variable 3:**
- Name: `VITE_MAIN_SITE_URL`
- Value: `https://biruniaga.com`
- Klik **Add**

Klik **Deploy**

### Step 4: Tunggu Deploy Selesai

Tunggu 2-3 menit. Vercel akan kasih URL temporary seperti:
```
https://admin-biruniaga.vercel.app
```

Buka URL tersebut untuk test. Coba login. Jika berhasil login, berarti berhasil! ✅

### Step 5: Setup Custom Domain

1. Di project page, klik **Settings** (tab atas)
2. Klik **Domains** (sidebar kiri)
3. Di bagian "Add Domain", ketik: `admin.biruniaga.com`
4. Klik **Add**
5. Vercel akan kasih instruksi DNS. **CATAT INI:**

```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

### Step 6: Setup DNS di Hostinger

1. Login ke Hostinger: https://hpanel.hostinger.com
2. Di dashboard, cari domain `biruniaga.com`
3. Klik **Manage**
4. Klik **DNS / Name Servers**
5. Klik **Add Record**

**Tambah Record:**
- Type: `CNAME`
- Name: `admin`
- Points to: `cname.vercel-dns.com`
- TTL: `14400` (atau biarkan default)
- Klik **Add Record** atau **Save**

### Step 7: Verifikasi

1. Tunggu 5-10 menit untuk DNS propagate
2. Buka https://admin.biruniaga.com
3. Coba login dengan `admin@biruniaga.com`
4. Jika berhasil login, berarti berhasil! 🎉

---

## 🔧 PART 4: Update Supabase CORS

### Step 1: Buka Supabase Dashboard

1. Buka https://supabase.com/dashboard
2. Login
3. Pilih project `biruniaga`

### Step 2: Update CORS

1. Klik **Settings** (gear icon di sidebar bawah)
2. Klik **API**
3. Scroll ke bagian **CORS Configuration**
4. Di bagian "Additional allowed origins", tambahkan (satu per baris):

```
https://biruniaga.com
https://www.biruniaga.com
https://admin.biruniaga.com
```

5. Klik **Save**

---

## ✅ CHECKLIST FINAL

### Website Utama
- [ ] Push ke GitHub repo `website-biruniaga`
- [ ] Deploy ke Vercel
- [ ] Setup DNS A record: @ → 76.76.21.21
- [ ] Setup DNS CNAME: www → cname.vercel-dns.com
- [ ] Test: https://biruniaga.com bisa diakses
- [ ] Test: Produk muncul dari database
- [ ] Test: Form kontak redirect ke WhatsApp

### Admin Panel
- [ ] Push ke GitHub repo `admin-biruniaga`
- [ ] Deploy ke Vercel
- [ ] Add 3 environment variables
- [ ] Setup DNS CNAME: admin → cname.vercel-dns.com
- [ ] Test: https://admin.biruniaga.com bisa diakses
- [ ] Test: Login berhasil
- [ ] Test: Dashboard muncul
- [ ] Test: CRUD produk
- [ ] Test: Upload gambar

### Supabase
- [ ] Update CORS dengan domain production
- [ ] Test: API call dari website utama
- [ ] Test: API call dari admin panel

---

## 🎉 SELESAI!

Website sudah live di:
- **Website Utama:** https://biruniaga.com
- **Admin Panel:** https://admin.biruniaga.com

**Login Admin:**
```
Email: admin@biruniaga.com
Password: [Password yang kamu set]
```

---

## 🆘 Troubleshooting

### "git: command not found"

Install Git dulu:
- Windows: https://git-scm.com/download/win
- Setelah install, restart terminal

### "Permission denied (publickey)" saat push

Gunakan HTTPS instead of SSH:
```bash
git remote set-url origin https://github.com/USERNAME/website-biruniaga.git
```

### DNS belum propagate

- Tunggu 10-30 menit
- Clear browser cache
- Test di https://dnschecker.org
- Test di browser lain atau incognito

### Build error di Vercel

- Cek error log di Vercel dashboard
- Pastikan environment variables sudah benar
- Klik **Redeploy** untuk coba lagi

### CORS error setelah deploy

- Update CORS di Supabase (Part 4)
- Tunggu 1-2 menit
- Refresh browser (Ctrl+Shift+R)

### Admin panel tidak bisa login

- Cek environment variables di Vercel Settings
- Pastikan 3 variables sudah benar
- Klik **Redeploy**

---

## 📞 Butuh Bantuan?

Jika ada error atau stuck di step tertentu:
1. Screenshot error message
2. Beritahu di step mana stuck
3. Saya akan bantu troubleshoot!

**Selamat deploy! 🚀**
