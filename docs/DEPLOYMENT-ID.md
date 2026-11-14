# Deployment ke domain kampus

Aplikasi Next.js berjalan pada Node.js, tanpa ketergantungan API Vercel. Target yang didukung: root domain atau subdomain kampus, misalnya `https://festival.example.edu`. Nama ini contoh, bukan domain NSU yang telah disetujui. Hosting statis saja tidak cukup karena locale dibaca dari cookie di server.

1. Arahkan DNS domain yang disetujui ke server kampus.
2. Set `SITE_URL=https://domain-kampus-yang-sebenarnya` pada `.env` server.
3. Jalankan `docker compose -f compose.production.yml up -d --build`.
4. Reverse proxy kampus meneruskan HTTPS ke `127.0.0.1:3000`, beserta `Host`, `X-Forwarded-Host`, dan `X-Forwarded-Proto`. Pasang sertifikat TLS di proxy. Port aplikasi terikat ke localhost.
5. Periksa `/api/health`, `/map`, `/stand/china-15`, `/stand/china-16`, `/stand/indonesia`, dan pergantian EN/RU.
6. Setelah domain baru tervalidasi, buat redirect permanen dari domain lama dengan mempertahankan path dan query. DNS/hosting lama harus tetap aktif selama masa transisi.

`SITE_URL` dibaca saat runtime. Pemindahan origin tidak membutuhkan perubahan source code; restart container dengan environment baru. Semua navigasi internal dan aset peta menggunakan URL relatif terhadap root. Prefix subfolder seperti `/sputnik` belum dikonfigurasi; gunakan subdomain atau tambahkan dukungan Next.js basePath beserta prefix aset sebelum memilih deployment subfolder.

Cookie locale bersifat host-only. Pilihan bahasa dan progres kuis/reward yang disimpan di localStorage tidak otomatis berpindah lintas domain. Pengunjung mungkin perlu memilih ulang bahasa; jangan menjanjikan migrasi hadiah otomatis.

Font Google dan gambar bendera FlagCDN masih diambil dari pihak ketiga. Konten utama dan peta disajikan server sendiri. Jika jaringan kampus memblokir layanan tersebut, browser memakai fallback font; bendera perlu disediakan lokal. CMS, login admin, dan database belum diimplementasikan.

Untuk rollback, gunakan image/commit sebelumnya dan environment domain yang sama. Validasi Docker di server target tetap diperlukan; build Next.js lokal bukan bukti konfigurasi DNS, TLS, atau reverse proxy berhasil.
