<p align="center">
  <img src="public/icons/icon-512.png" width="120" alt="RuangIbadah Logo" />
</p>

<h1 align="center">🕌 RuangIbadah</h1>

<p align="center">
  <strong>Platform utilitas ibadah harian untuk Muslim modern.</strong><br />
  Dibuat oleh komunitas <a href="https://github.com/Kata-mamah-aku-calon-engineer">Kata-mamah-aku-calon-engineer</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?logo=supabase" />
  <img src="https://img.shields.io/badge/PWA-Installable-blueviolet?logo=pwa" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## 📖 Tentang

**RuangIbadah** adalah aplikasi web progresif (PWA) yang menyediakan berbagai utilitas ibadah harian bagi umat Muslim. Mulai dari membaca Al-Qur'an, mengakses 38.000+ hadits shahih, menghitung arah kiblat, hingga tasbih digital — semuanya dalam satu platform yang ringan, cepat, dan bisa di-install langsung di HP.

Proyek ini merupakan karya open-source dari komunitas **Kata-mamah-aku-calon-engineer** — sekelompok developer muda Indonesia yang belajar ngoding sambil bikin sesuatu yang bermanfaat untuk umat. 🚀

---

## ✨ Fitur Lengkap

| # | Fitur | Deskripsi |
|---|-------|-----------|
| 1 | **Al-Qur'an Digital** | 114 surat lengkap dengan teks Arab, latin, terjemahan Indonesia, audio murottal streaming, bookmark, dan swipe navigasi antar surah. |
| 2 | **Kitab Hadits** | 38.000+ hadits dari 9 kitab utama (Bukhari, Muslim, Abu Daud, Tirmidzi, Nasai, Ibnu Majah, Ahmad, Malik, Darimi). Navigasi per halaman & pencarian nomor hadits. |
| 3 | **Jadwal Sholat** | Waktu sholat akurat berdasarkan lokasi (API Aladhan, metode Kemenag RI). Hitung mundur menuju waktu sholat berikutnya + notifikasi push. |
| 4 | **Jam Digital Real-time** | Jam interaktif yang berdetak per detik, tampil di halaman utama bersama tanggal Hijriah & Masehi. |
| 5 | **Kompas Kiblat** | Arah kiblat real-time menggunakan DeviceOrientation API (sensor gyroscope & magnetometer HP). Support iOS 13+. |
| 6 | **Tasbih Digital** | Alat hitung dzikir interaktif dengan target 33/99/1000. Haptic feedback (HP bergetar setiap hitungan). |
| 7 | **Kumpulan Doa** | 108 doa harian dari Al-Qur'an & Hadits lengkap dengan teks Arab, latin, dan terjemahan. Live search. |
| 8 | **Kalkulator Zakat** | 4 jenis zakat: Penghasilan, Emas/Perak, Tabungan, Fitrah. Cek nisab otomatis. |
| 9 | **Peta Masjid Terdekat** | Peta interaktif (Leaflet.js + OpenStreetMap) untuk menemukan masjid di sekitar. Radius 1-10 km. |
| 10 | **Artikel & Kajian** | Artikel islami terbaru otomatis dari sumber terpercaya Indonesia: muslim.or.id, rumaysho.com, konsultasisyariah.com. |
| 11 | **Dark/Light Mode** | Toggle tema gelap/terang dengan ikon Sun/Moon di navbar. Mengikuti preferensi sistem secara default. |
| 12 | **Notifikasi Sholat** | Push Notification untuk pengingat waktu sholat. Menggunakan Notification API browser. |
| 13 | **Audio Murottal** | Streaming audio murottal dari Misyari Rasyid Al-Afasi, tersedia di setiap halaman surah. |
| 14 | **Halaman Profil** | Halaman profil pengguna dengan info akun, terakhir dibaca, dan opsi logout. |
| 15 | **Multi-bahasa** | Dukungan tiga bahasa: Indonesia 🇮🇩, English 🇬🇧, dan العربية 🇸🇦. Toggle via flag selector. |
| 16 | **PWA Support** | Bisa di-install langsung ke layar HP seperti aplikasi native. Offline support dengan Service Worker. |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [HeroUI](https://heroui.com/) (Beta) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animasi** | [Framer Motion](https://www.framer.com/motion/) |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **Auth & DB** | [Supabase](https://supabase.com/) (Google OAuth + PostgreSQL) |
| **Peta** | [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| **Tema** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **PWA** | Custom Service Worker + Web App Manifest |

---

## 🌐 API & Sumber Data

| Data | Sumber | Tipe |
|------|--------|------|
| Al-Qur'an | [equran.id](https://equran.id/) | REST API |
| Hadits | [api.hadith.gading.dev](https://api.hadith.gading.dev/) | REST API (Live) |
| Doa Harian | [api.myquran.com](https://api.myquran.com/) | JSON (Offline) |
| Jadwal Sholat | [Aladhan API](https://aladhan.com/prayer-times-api) | REST API |
| Arah Kiblat | [Aladhan API](https://aladhan.com/prayer-times-api) | REST API |
| Masjid Terdekat | [Overpass API](https://overpass-api.de/) (OpenStreetMap) | REST API |
| Artikel Kajian | muslim.or.id, rumaysho.com, konsultasisyariah.com | RSS Feed |

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
2. Jalankan SQL dari `schema.sql` di SQL Editor Supabase
3. Aktifkan Google OAuth di **Authentication > Providers > Google**
4. Tambahkan redirect URL: `http://localhost:3000/auth/callback`

### 4. Konfigurasi Environment

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. 🎉

---

## 📱 Install sebagai Aplikasi (PWA)

RuangIbadah bisa di-install langsung ke HP tanpa melalui Play Store:

1. Buka website RuangIbadah di **Chrome** (Android) atau **Safari** (iOS)
2. Klik menu ⋮ → **"Tambahkan ke Layar Utama"**
3. Aplikasi akan muncul di app drawer seperti aplikasi native!

---

## 📁 Struktur Proyek

```
Ruangibadah/
├── public/
│   ├── icons/            # PWA icons
│   ├── manifest.json     # Web App Manifest
│   └── sw.js             # Service Worker (offline + push)
├── src/
│   ├── app/
│   │   ├── page.tsx          # Beranda + Quick Actions
│   │   ├── quran/            # Al-Qur'an (swipe navigation)
│   │   ├── hadith/           # Kitab Hadits (9 kitab)
│   │   ├── jadwal-sholat/    # Jadwal sholat + notifikasi
│   │   ├── kiblat/           # Kompas kiblat
│   │   ├── tasbih/           # Tasbih digital
│   │   ├── doa/              # Kumpulan doa (108)
│   │   ├── zakat/            # Kalkulator zakat
│   │   ├── masjid/           # Masjid terdekat
│   │   ├── kajian/           # Artikel & info kajian
│   │   └── profil/           # Halaman profil pengguna
│   ├── components/
│   │   ├── navbar.tsx        # Navigasi (dropdown + dark mode)
│   │   ├── footer.tsx        # Footer (kredit komunitas)
│   │   ├── PrayerCountdown.tsx  # Countdown + jam
│   │   ├── PushNotification.tsx # Notifikasi sholat
│   │   ├── SwipeNavigator.tsx   # Swipe gesture Qur'an
│   │   ├── AudioPlayer.tsx   # Murottal player
│   │   └── BookmarkButton.tsx
│   ├── data/
│   │   └── doa.json          # 108 doa (offline-ready)
│   └── utils/
│       ├── i18n.tsx          # Multi-bahasa (ID/EN/AR)
│       └── supabase/         # Supabase helpers
├── schema.sql
├── .env.local
└── README.md
```

---

## 🗺️ Roadmap

- [x] Al-Qur'an digital (114 surat + bookmark)
- [x] Jadwal sholat (Aladhan API)
- [x] Kompas kiblat (DeviceOrientation)
- [x] Kalkulator zakat (4 jenis)
- [x] Peta masjid terdekat (Leaflet + Overpass)
- [x] Tasbih digital (haptic feedback)
- [x] Kumpulan doa (108 doa)
- [x] Kitab hadits (38.000+ dari 9 kitab)
- [x] Artikel & kajian (RSS feed otomatis)
- [x] Jam digital real-time
- [x] PWA support (installable + offline)
- [x] Login Google (Supabase Auth)
- [x] Dark/Light mode toggle
- [x] Notifikasi waktu sholat (Push Notification)
- [x] Audio murottal streaming
- [x] Halaman profil pengguna
- [x] Multi-bahasa (ID/EN/AR)
- [x] Swipe navigasi antar surah

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Ini adalah proyek komunitas — siapa saja boleh ikut berkontribusi.

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur/tambah-xyz`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur xyz'`)
4. Push ke branch (`git push origin fitur/tambah-xyz`)
5. Buat Pull Request

---

## 👥 Tim & Komunitas

<p align="center">
  <strong>Kata-mamah-aku-calon-engineer</strong><br />
  <em>Komunitas developer muda Indonesia yang belajar ngoding sambil bikin sesuatu yang bermanfaat.</em>
</p>

<p align="center">
  <a href="https://github.com/Kata-mamah-aku-calon-engineer">
    <img src="https://img.shields.io/badge/GitHub-Kata--mamah--aku--calon--engineer-181717?logo=github" />
  </a>
</p>

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  <strong>بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</strong><br />
  <em>Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.</em><br /><br />
  Semoga proyek ini menjadi amal jariyah bagi seluruh kontributor. 🤲
</p>
