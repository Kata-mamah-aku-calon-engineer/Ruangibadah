# 🕌 RuangIbadah

**Platform utilitas ibadah harian berbasis web untuk Muslim modern.**

RuangIbadah adalah aplikasi web yang dirancang untuk membantu umat Muslim dalam menjalankan ibadah sehari-hari. Dibangun dengan teknologi modern, aplikasi ini menyediakan akses cepat ke berbagai fitur ibadah tanpa perlu menginstal aplikasi berat — cukup buka di browser.

> 🎯 **Target Pengguna:** Anak muda, pelajar, mahasiswa, dan pekerja kantoran yang butuh akses cepat ke utilitas ibadah harian.

---

## ✨ Fitur Utama

### 🏠 Beranda
- Sapaan personal dengan nama pengguna
- Tanggal Hijriah & Masehi
- **Countdown waktu shalat** terdekat berdasarkan lokasi otomatis
- Quick actions: Lanjut Baca Qur'an, Arah Kiblat, Kalkulator Zakat
- Konten harian: ayat hari ini, doa, dan quotes islami

### 📖 Al-Qur'an
- Daftar 114 Surah lengkap dengan navigasi per Juz
- Tampilan bersih: teks Arab besar, transliterasi, dan terjemahan Bahasa Indonesia
- Audio player murottal (floating player)
- Bookmark per ayat tersimpan di database

### 🕐 Jadwal Sholat
- Jadwal sholat 5 waktu berdasarkan lokasi pengguna
- Data realtime dari [Aladhan API](https://aladhan.com/prayer-times-api)

### 🧭 Arah Kiblat
- Penunjuk arah kiblat berdasarkan GPS / lokasi perangkat

### 📚 Info Kajian
- Jadwal kajian offline di area sekitar
- Filter berdasarkan kota/lokasi

### 🔐 Autentikasi
- Login dengan akun Google via Supabase Auth
- Profil pengguna tersimpan aman di database

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Bahasa** | TypeScript |
| **UI Library** | [HeroUI](https://heroui.com/) (Beta) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animasi** | [Framer Motion](https://www.framer.com/motion/) |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **Backend & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| **Tema** | [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode) |

---

## 📁 Struktur Proyek

```
muslim/
├── public/                 # Aset statis (ikon, gambar)
├── src/
│   ├── app/
│   │   ├── auth/           # Halaman & logika autentikasi
│   │   ├── jadwal-sholat/  # Halaman jadwal sholat
│   │   ├── kajian/         # Halaman info kajian
│   │   ├── kiblat/         # Halaman arah kiblat
│   │   ├── quran/          # Halaman Al-Qur'an & detail surah
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Halaman beranda
│   │   ├── providers.tsx   # Context providers (tema, dll)
│   │   └── globals.css     # Style global
│   ├── components/
│   │   ├── AudioPlayer.tsx     # Player murottal
│   │   ├── AuthButtons.tsx     # Tombol login/logout
│   │   ├── BookmarkButton.tsx  # Tombol bookmark ayat
│   │   ├── PrayerCountdown.tsx # Countdown shalat
│   │   ├── navbar.tsx          # Navigasi utama
│   │   └── footer.tsx          # Footer
│   └── utils/              # Utilitas & helper (Supabase client, dll)
├── schema.sql              # Skema database PostgreSQL
├── konsepdasar.md          # Dokumen konsep & perencanaan
├── .env.local              # Environment variables (Supabase keys)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🗄️ Skema Database

Menggunakan **PostgreSQL** via Supabase dengan Row Level Security (RLS):

| Tabel | Deskripsi |
|---|---|
| `auth.users` | Tabel bawaan Supabase Auth (id, email, created_at) |
| `user_profiles` | Data tambahan user (nama, lokasi, avatar) |
| `bookmarks` | Riwayat bookmark ayat Al-Qur'an per user |

> Semua tabel dilindungi dengan **Row Level Security** — user hanya bisa akses data milik sendiri.

---

## 🚀 Getting Started

### Prasyarat

- [Node.js](https://nodejs.org/) v18+
- Akun [Supabase](https://supabase.com/) (gratis)

### Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd muslim
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**

   Buat file `.env.local` di root project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup database**

   Jalankan `schema.sql` di Supabase SQL Editor untuk membuat tabel yang dibutuhkan.

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📜 Scripts

| Command | Deskripsi |
|---|---|
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Cek linting dengan ESLint |

---

## 🗺️ Roadmap

- [x] Setup Next.js + Tailwind CSS + HeroUI
- [x] Halaman beranda dengan countdown shalat
- [x] Integrasi API Al-Qur'an & jadwal sholat
- [x] Halaman pembacaan Al-Qur'an
- [x] Integrasi Supabase Auth (Google Login)
- [x] Fitur bookmark ayat
- [ ] Halaman arah kiblat (compass)
- [ ] Kalkulator zakat
- [ ] Peta masjid terdekat (Leaflet.js / Google Maps)
- [ ] Board jadwal kajian dengan filter lokasi
- [ ] PWA support (installable di HP)

---

## 🏗️ Deployment

Aplikasi ini dirancang untuk di-deploy menggunakan:

- **[Vercel](https://vercel.com/)** — Platform deployment optimal untuk Next.js
- **Self-hosted** — Containerisasi menggunakan LXC di Proxmox dengan Nginx reverse proxy + Cloudflare

---

## 📄 Lisensi

Proyek ini bersifat privat dan dikembangkan untuk kebutuhan internal.

---

<p align="center">
  Dibuat dengan ❤️ untuk kemudahan ibadah umat Muslim
</p>
