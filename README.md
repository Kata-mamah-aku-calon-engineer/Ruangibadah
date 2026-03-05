<p align="center">
  <img src="public/icons/icon-512.png" width="140" alt="RuangIbadah Logo" />
</p>

<h1 align="center">🕌 RuangIbadah</h1>

<p align="center">
  <strong>Platform utilitas ibadah harian untuk Muslim modern — diakses dari mana saja, kapan saja.</strong>
</p>

<p align="center">
  <a href="https://ruangibadah-id.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-ruangibadah--id.vercel.app-00C853?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Auth_+_DB-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/PWA-Installable-7C3AED?style=flat-square&logo=pwa&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square" />
</p>

<p align="center">
  Dibuat oleh komunitas <a href="https://github.com/Kata-mamah-aku-calon-engineer"><strong>Kata-mamah-aku-calon-engineer</strong></a>
</p>

---

## 📖 Tentang Proyek

**RuangIbadah** adalah Progressive Web App (PWA) yang menyediakan berbagai utilitas ibadah harian bagi umat Muslim. Mulai dari membaca Al-Qur'an, mengakses **38.000+ hadits shahih**, menghitung arah kiblat, sampai tasbih digital — semuanya dalam satu platform yang ringan, cepat, dan **bisa di-install langsung di HP seperti aplikasi native**.

> 💡 **Kenapa PWA?** Karena PWA bisa berjalan di **semua platform** (Android, iOS, Windows, Mac) tanpa perlu publish ke Play Store. Cukup buka browser → install → selesai! Bahkan bisa dikonversi ke file `.apk` untuk Android.

Proyek ini merupakan karya open-source dari komunitas **Kata-mamah-aku-calon-engineer** — sekelompok developer muda Indonesia yang belajar ngoding sambil bikin sesuatu yang bermanfaat untuk umat. 🚀

---

## ✨ Fitur Lengkap

### 📚 Konten Keagamaan

| Fitur | Deskripsi |
|-------|-----------|
| **Al-Qur'an Digital** | 114 surat lengkap — teks Arab, latin, terjemahan Indonesia, audio murottal streaming (Misyari Rasyid Al-Afasi), bookmark, dan swipe navigasi antar surah. |
| **Kitab Hadits** | 38.000+ hadits dari **9 kitab utama** (Bukhari, Muslim, Abu Daud, Tirmidzi, Nasai, Ibnu Majah, Ahmad, Malik, Darimi). Navigasi per halaman & pencarian nomor hadits. |
| **Kumpulan Doa** | 108 doa harian dari Al-Qur'an & Hadits — teks Arab, latin, terjemahan lengkap. Live search instan. |
| **Artikel & Kajian** | Artikel islami terbaru otomatis dari sumber terpercaya: muslim.or.id, rumaysho.com, konsultasisyariah.com. |

### 🧭 Utilitas Ibadah

| Fitur | Deskripsi |
|-------|-----------|
| **Jadwal Sholat** | Akurat berdasarkan lokasi GPS (API Aladhan, metode Kemenag RI). Countdown ke waktu sholat berikutnya + push notification. |
| **Kompas Kiblat** | Arah kiblat real-time menggunakan sensor gyroscope & magnetometer HP. Support iOS 13+ dan Android. |
| **Tasbih Digital** | Alat hitung dzikir interaktif dengan target 33/99/1000. Haptic feedback (HP bergetar setiap hitungan). |
| **Kalkulator Zakat** | 4 jenis: Penghasilan, Emas/Perak, Tabungan, Fitrah. Cek nisab otomatis. |
| **Peta Masjid Terdekat** | Peta interaktif (Leaflet.js + OpenStreetMap) — cari masjid di sekitar dengan radius 1-10 km. |

### 🎨 Desain & UX

| Fitur | Deskripsi |
|-------|-----------|
| **Dark Mode Permanen** | Tampilan gelap yang nyaman untuk mata, aktif secara default di semua halaman. |
| **Jam Digital Real-time** | Jam interaktif berdetak per detik di beranda — lengkap dengan tanggal Hijriah & Masehi. |
| **PWA Installable** | Install langsung ke HP dari browser. Bisa juga dikonversi ke APK Android. |
| **Login Google** | Autentikasi via Google OAuth (Supabase Auth). Simpan bookmark & data pengguna. |
| **Responsive** | Tampilan optimal di semua ukuran layar — HP, tablet, desktop. |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────┐
│  Frontend                                       │
│  ├── Next.js 16 (App Router + Turbopack)        │
│  ├── TypeScript 5                               │
│  ├── Tailwind CSS 4                             │
│  ├── HeroUI (Component Library)                 │
│  └── Lucide React (Icons)                       │
│                                                 │
│  Backend & Auth                                 │
│  ├── Supabase (PostgreSQL + Google OAuth)        │
│  └── Next.js API Routes (Server Components)     │
│                                                 │
│  Maps & Location                                │
│  ├── Leaflet.js + OpenStreetMap                 │
│  └── Overpass API (Masjid data)                 │
│                                                 │
│  PWA                                            │
│  ├── Custom Service Worker (sw.js)              │
│  ├── Web App Manifest (manifest.json)           │
│  └── Push Notification API                      │
│                                                 │
│  Deployment                                     │
│  └── Vercel (Auto-deploy from GitHub)           │
└─────────────────────────────────────────────────┘
```

---

## 🌐 API & Sumber Data

| Data | Sumber | Tipe |
|------|--------|------|
| Al-Qur'an | [equran.id](https://equran.id/) | REST API |
| Hadits | [api.hadith.gading.dev](https://api.hadith.gading.dev/) | REST API |
| Doa Harian | Local JSON (`doa.json`) | Offline-ready |
| Jadwal Sholat | [Aladhan API](https://aladhan.com/prayer-times-api) | REST API |
| Arah Kiblat | [Aladhan API](https://aladhan.com/prayer-times-api) | REST API |
| Masjid Terdekat | [Overpass API](https://overpass-api.de/) (OpenStreetMap) | REST API |
| Artikel Kajian | muslim.or.id, rumaysho.com | RSS Feed |

---

## 🚀 Cara Setup & Menjalankan

### Prasyarat

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) atau [pnpm](https://pnpm.io/)
- Akun [Supabase](https://supabase.com/) (gratis)

### 1. Clone Repository

```bash
git clone https://github.com/Kata-mamah-aku-calon-engineer/Ruangibadah.git
cd Ruangibadah
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat project baru di [Supabase Dashboard](https://app.supabase.com/)
2. Jalankan SQL dari `schema.sql` di **SQL Editor** Supabase
3. Aktifkan **Google OAuth** di **Authentication → Providers → Google**
4. Tambahkan redirect URL: `http://localhost:3000/auth/callback`

### 4. Konfigurasi Environment

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. 🎉

### 6. Build Production

```bash
npm run build
npm start
```

---

## 📱 Install sebagai Aplikasi (PWA)

RuangIbadah bisa di-install langsung ke HP **tanpa melalui Play Store**:

### Android (Chrome)
1. Buka [ruangibadah-id.vercel.app](https://ruangibadah-id.vercel.app) di **Chrome**
2. Klik menu **⋮** (tiga titik) di pojok kanan atas
3. Pilih **"Tambahkan ke Layar Utama"** atau **"Install App"**
4. Klik **"Install"** — aplikasi akan muncul di app drawer! ✅

### iPhone / iPad (Safari)
1. Buka [ruangibadah-id.vercel.app](https://ruangibadah-id.vercel.app) di **Safari**
2. Tap ikon **Share** (kotak dengan panah ke atas) di bagian bawah
3. Scroll ke bawah, pilih **"Add to Home Screen"**
4. Klik **"Add"** — aplikasi akan muncul di home screen! ✅

### Desktop (Chrome / Edge)
1. Buka [ruangibadah-id.vercel.app](https://ruangibadah-id.vercel.app) di browser
2. Klik ikon **install** (⊕) di address bar
3. Klik **"Install"** — aplikasi akan terbuka sebagai window terpisah!

---

## 📦 Cara Membuat File APK dari PWA (Android)

> **Ingin mendistribusikan RuangIbadah sebagai file `.apk`?** Gunakan [PWABuilder](https://www.pwabuilder.com/) — tool gratis dari Microsoft yang mengkonversi PWA menjadi package Android.

### Step 1: Buka PWABuilder

1. Kunjungi **[pwabuilder.com](https://www.pwabuilder.com/)**
2. Masukkan URL website: `https://ruangibadah-id.vercel.app`
3. Klik **"Start"** dan tunggu analisis selesai (30 detik – 2 menit)

### Step 2: Review Skor PWA

Setelah analisis selesai, pastikan:

| Kategori | Status | Keterangan |
|----------|--------|------------|
| **Required** | ✅ 0 issue | Semua syarat wajib terpenuhi |
| **Manifest** | ✅ Valid | `manifest.json` lengkap |
| **Service Worker** | ✅ Registered | `sw.js` aktif |
| **Optional** | ⚠️ Opsional | Tidak wajib, bisa diabaikan |
| **Features** | ℹ️ Opsional | Fitur advanced, tidak perlu untuk APK |

> 💡 **Warning di Optional dan Features itu AMAN dan bisa diabaikan.** Yang penting status Required = 0 issue.

### Step 3: Generate APK

1. Klik tombol **"Package For Stores"** (hijau, pojok kanan atas)
2. Pilih **"Android"**
3. Pilih **"Other Android"** (APK gratis, tanpa perlu Google Play Console)
4. Konfigurasi opsi:

| Opsi | Rekomendasi |
|------|-------------|
| **Package Name** | `com.ruangibadah.app` |
| **App Name** | `RuangIbadah` |
| **Launcher Name** | `RuangIbadah` |
| **Theme Color** | `#0f172a` (dark navy) |
| **Background Color** | `#0f172a` |
| **Start URL** | `/` |
| **Display Mode** | `Standalone` |
| **Status Bar Color** | `#0f172a` |
| **Splash Fade Out Duration** | `300` ms |

5. Klik **"Download Package"**
6. File `.zip` akan terunduh berisi file `.apk`

### Step 4: Install APK

1. **Transfer** file `.apk` ke HP Android
2. Buka file `.apk` di HP
3. Jika diminta izin, aktifkan **"Install dari sumber tidak dikenal"** di Settings
4. Klik **"Install"** → Selesai! 🎉

### Step 5: Distribusi (Opsional)

Kamu bisa membagikan file `.apk` ke teman-teman melalui:
- **WhatsApp / Telegram** — kirim sebagai file
- **Google Drive** — upload dan share link
- **GitHub Releases** — upload di tab Releases repository ini

> ⚠️ **Catatan:** APK dari PWABuilder menggunakan Trusted Web Activity (TWA). Artinya aplikasi membuka konten web di Chrome tanpa address bar — jadi tampilannya seperti aplikasi native.

---

## 📁 Struktur Proyek

```
Ruangibadah/
├── public/
│   ├── icons/               # PWA icons (192x192, 512x512)
│   ├── screenshots/         # PWA screenshots (desktop & mobile)
│   ├── manifest.json        # Web App Manifest (PWA config)
│   └── sw.js                # Service Worker (offline + push notification)
├── src/
│   ├── app/
│   │   ├── page.tsx             # 🏠 Beranda (jam, countdown, quick actions)
│   │   ├── layout.tsx           # 🎨 Global layout (dark mode, fonts)
│   │   ├── globals.css          # 🎨 Global styles
│   │   ├── quran/               # 📖 Al-Qur'an (114 surat + detail ayat)
│   │   ├── hadith/              # 📚 Kitab Hadits (9 kitab, 38.000+ hadits)
│   │   ├── jadwal-sholat/       # 🕐 Jadwal sholat (harian + bulanan)
│   │   ├── kiblat/              # 🧭 Kompas arah kiblat
│   │   ├── tasbih/              # 📿 Tasbih digital
│   │   ├── doa/                 # 🤲 Kumpulan doa (108 doa)
│   │   ├── zakat/               # 💰 Kalkulator zakat (4 jenis)
│   │   ├── masjid/              # 🕌 Peta masjid terdekat
│   │   ├── kajian/              # 📰 Artikel & info kajian
│   │   └── profil/              # 👤 Halaman profil pengguna
│   ├── components/
│   │   ├── navbar.tsx           # Navigasi utama (desktop + mobile)
│   │   ├── footer.tsx           # Footer (kredit komunitas)
│   │   ├── PrayerCountdown.tsx  # Countdown waktu sholat + jam
│   │   ├── PushNotification.tsx # Push notification handler
│   │   ├── SwipeNavigator.tsx   # Swipe gesture untuk navigasi surah
│   │   ├── AudioPlayer.tsx      # Audio murottal player
│   │   ├── MasjidMap.tsx        # Peta Leaflet.js untuk masjid
│   │   └── BookmarkButton.tsx   # Bookmark surah/ayat
│   ├── data/
│   │   └── doa.json             # 108 doa (offline-ready)
│   └── utils/
│       └── supabase/            # Supabase client helpers
├── schema.sql                   # SQL schema untuk Supabase
├── .env.local                   # Environment variables (private)
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── package.json                 # Dependencies & scripts
```

---

## 🗺️ Roadmap

### ✅ Sudah Selesai
- [x] Al-Qur'an digital (114 surat + bookmark + audio murottal)
- [x] Kitab hadits (38.000+ dari 9 kitab utama)
- [x] Jadwal sholat (Aladhan API + countdown + notifikasi)
- [x] Kompas kiblat (DeviceOrientation API)
- [x] Tasbih digital (haptic feedback)
- [x] Kumpulan doa (108 doa, live search)
- [x] Kalkulator zakat (4 jenis)
- [x] Peta masjid terdekat (Leaflet + Overpass API)
- [x] Artikel & kajian (RSS feed otomatis)
- [x] Jam digital real-time + tanggal Hijriah
- [x] PWA support (installable + offline)
- [x] Login Google (Supabase Auth)
- [x] Dark mode permanen
- [x] Responsive design (mobile, tablet, desktop)
- [x] Swipe navigasi antar surah

### 🔮 Rencana Ke Depan
- [ ] Widget jadwal sholat di halaman utama
- [ ] Statistik bacaan Al-Qur'an (progress tracker)
- [ ] Mode khatam (target 30 hari)
- [ ] Hafalan tracker (muraja'ah helper)
- [ ] Multi-qari audio (pilihan 5+ qari)
- [ ] Push notification zakat (pengingat bulanan)
- [ ] Tema kustomisasi (pilihan warna)
- [ ] Publish ke Google Play Store

---

## 🤝 Kontribusi

<p align="center">
  <strong>Proyek ini milik komunitas — kontribusi kamu sangat berarti! 💪</strong><br />
  <sub>Dari yang baru belajar ngoding sampai senior developer, semua welcome.</sub>
</p>

### Langkah Berkontribusi

<table>
<tr>
<td width="60"><strong>Step</strong></td>
<td><strong>Aksi</strong></td>
<td><strong>Command</strong></td>
</tr>
<tr>
<td align="center">1️⃣</td>
<td><strong>Fork & Clone</strong> — Fork repo ini, lalu clone ke lokal</td>
<td>

```bash
git clone https://github.com/<username>/Ruangibadah.git
cd Ruangibadah && npm install
```

</td>
</tr>
<tr>
<td align="center">2️⃣</td>
<td><strong>Buat Branch</strong> — Buat branch baru untuk fitur/fix kamu</td>
<td>

```bash
git checkout -b fitur/nama-fitur-kamu
```

</td>
</tr>
<tr>
<td align="center">3️⃣</td>
<td><strong>Koding!</strong> — Implementasi perubahan kamu</td>
<td>

```bash
npm run dev  # Jalankan dev server
```

</td>
</tr>
<tr>
<td align="center">4️⃣</td>
<td><strong>Commit</strong> — Commit dengan pesan yang jelas</td>
<td>

```bash
git add .
git commit -m "feat: menambahkan fitur xyz"
```

</td>
</tr>
<tr>
<td align="center">5️⃣</td>
<td><strong>Push & PR</strong> — Push branch dan buat Pull Request</td>
<td>

```bash
git push origin fitur/nama-fitur-kamu
```

</td>
</tr>
</table>

> Setelah push, buka **Pull Request** di GitHub → tim kami akan review & merge! 🎉

### 📝 Konvensi Commit

Kami menggunakan format [Conventional Commits](https://www.conventionalcommits.org/) agar history git rapi dan mudah dibaca:

```
<type>: <deskripsi singkat>

Contoh:
feat: menambahkan fitur hafalan tracker
fix: memperbaiki overflow di halaman kajian
docs: update README dengan tutorial APK
style: perbaiki spacing di halaman quran
refactor: ekstrak komponen PrayerCard
perf: optimasi lazy loading gambar
```

| Emoji | Prefix | Kapan Dipakai | Contoh |
|-------|--------|---------------|--------|
| ✨ | `feat:` | Fitur baru | `feat: tambah mode khatam` |
| 🐛 | `fix:` | Perbaikan bug | `fix: countdown tidak reset` |
| 📝 | `docs:` | Dokumentasi | `docs: update API reference` |
| 🎨 | `style:` | UI / styling | `style: responsive navbar` |
| ♻️ | `refactor:` | Refactoring | `refactor: split utils` |
| ⚡ | `perf:` | Performa | `perf: cache API response` |
| 🧪 | `test:` | Testing | `test: unit test zakat` |
| 🔧 | `chore:` | Maintenance | `chore: update dependencies` |

### 💡 Ide Kontribusi

Bingung mau kontribusi apa? Ini beberapa ide:

- 🌙 Tambah **mode khatam** (target baca 30 hari)
- 📊 Buat **statistik bacaan** (progress tracker)
- 🎙️ Tambah pilihan **multi-qari** untuk audio murottal
- 🌍 Tambah **terjemahan bahasa Inggris**
- 🧪 Tulis **unit test** untuk kalkulator zakat
- 📱 Buat **widget** jadwal sholat
- 🎨 Bikin **tema warna** yang bisa dikustomisasi

---

## 👥 Tim & Komunitas

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-❤️_di_Indonesia-FF0000?style=for-the-badge" /><br /><br />
  <strong>Kata-mamah-aku-calon-engineer</strong><br />
  <em>Komunitas developer muda Indonesia yang belajar ngoding<br />sambil bikin sesuatu yang bermanfaat untuk umat.</em>
</p>

<p align="center">
  <a href="https://github.com/Kata-mamah-aku-calon-engineer">
    <img src="https://img.shields.io/badge/GitHub-Organization-181717?style=for-the-badge&logo=github" />
  </a>
  &nbsp;
  <a href="https://ruangibadah-id.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Website-Live_Demo-00C853?style=for-the-badge" />
  </a>
</p>

### 🌟 Contributors

<a href="https://github.com/Kata-mamah-aku-calon-engineer/Ruangibadah/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kata-mamah-aku-calon-engineer/Ruangibadah" />
</a>

<sub>Dibuat otomatis dengan [contrib.rocks](https://contrib.rocks)</sub>

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) — bebas digunakan, dimodifikasi, dan didistribusikan.

---

<p align="center">
  <strong>بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</strong><br />
  <em>Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.</em><br /><br />
  Semoga proyek ini menjadi amal jariyah bagi seluruh kontributor. 🤲<br /><br />
  <sub>⭐ Jika bermanfaat, jangan lupa kasih star di GitHub ya!</sub>
</p>
