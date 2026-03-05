1. Identitas & Positioning Produk
Nama Proyek (Ide): RuangIbadah

Target Pengguna: Anak muda, pelajar, mahasiswa, dan pekerja kantoran yang butuh akses cepat ke utilitas ibadah harian tanpa harus install aplikasi berat di HP.

Nilai Jual Utama (USP): Akses secepat kilat (karena berbasis web), tanpa iklan yang mengganggu (clean UI), dan fitur komunitas lokal.

2. Arsitektur Teknis & Tech Stack
Biar performanya kencang dan gampang dikelola, ini susunan stack yang pas buat dieksekusi:

Frontend: Next.js (App Router). Sangat ideal buat SEO dan kecepatan muat halaman (Server-Side Rendering).

Styling: Tailwind CSS dipadukan dengan Shadcn UI. Bikin tampilan modern, minimalis, dan mobile-responsive tanpa perlu pusing mikirin CSS dari nol.

Backend & Database: Supabase. Kita pakai layanan ini buat sistem login pengguna (Auth) dan menyimpan data relasional di PostgreSQL.

Infrastruktur & Deployment: Containerisasi menggunakan LXC di lingkungan Proxmox. Lu bisa setup web server (Nginx/Apache) di dalam container tersebut, reverse proxy pakai Cloudflare, jadi manajemen resource server lebih efisien dan gampang di-backup.

3. Detail Fitur & Flow UI/UX
Kita bagi fungsionalitasnya ke dalam beberapa halaman utama:

Homepage (Beranda):

Header: Sapaan nama user (kalau sudah login), tanggal Hijriah & Masehi.

Hero Section: Countdown waktu shalat terdekat berdasarkan deteksi lokasi.

Quick Actions: Tombol besar untuk akses "Lanjut Baca Qur'an" (fitur last read), Arah Kiblat, dan Kalkulator Zakat.

Daily Content: Ayat hari ini, doa harian, atau quotes islami.

Halaman Al-Qur'an:

Daftar 114 Surah dan navigasi per Juz.

UI pembacaan yang bersih: Teks Arab besar, transliterasi (bisa di-hide), dan terjemahan bahasa Indonesia.

Fitur audio player melayang di bawah layar saat user memutar murottal.

Tombol bookmark per ayat yang datanya langsung masuk ke database.

Halaman Eksplorasi (Komunitas & Info):

Peta interaktif buat cari masjid terdekat (bisa pakai Leaflet.js atau Google Maps API).

Board jadwal kajian offline. Misalnya, user bisa filter jadwal kajian khusus di area Bekasi atau Jakarta.

4. Skema Database Inti (PostgreSQL di Supabase)
Biar kebayang struktur datanya, minimal lu butuh 3 tabel utama:

users (Sistem bawaan Supabase Auth)

id (UUID), email, created_at.

user_profiles (Data tambahan user)

id (Relasi ke users.id), full_name, location, avatar_url.

bookmarks (Menyimpan riwayat bacaan)

id (Primary Key), user_id (Foreign Key), surah_number (Int), ayah_number (Int), created_at (Timestamp).

5. Roadmap Pengembangan (Fase Pengerjaan)
Jangan dikerjakan semuanya sekaligus biar nggak burnout. Bagi jadi 3 fase:

Fase 1: MVP (Minimum Viable Product) - 1-2 Minggu

Setup Next.js dan Tailwind.

Tarik API pihak ketiga (EQuran API untuk Al-Qur'an, Aladhan API untuk jadwal shalat).

Selesaikan UI halaman utama dan pembacaan Al-Qur'an statis (tanpa login).

Fase 2: Fitur Dinamis & Database - 2 Minggu

Integrasi Supabase Auth (Login pakai Google biar cepat).

Bikin fitur bookmark dan last read yang tersimpan di database.

Tambahkan kalkulator zakat dengan logic matematika.