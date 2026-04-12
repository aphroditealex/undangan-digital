# 💍 Undangan Digital

Undangan pernikahan digital interaktif berbasis web dengan konsep **Interactive Room** — tamu dapat menjelajahi ruangan virtual, mengklik dekorasi untuk melihat informasi acara, mengisi RSVP, dan mengirim ucapan secara langsung.

> **Live Demo**: [dikondangin.vercel.app](https://dikondangin.vercel.app)

---

## ✨ Fitur Utama

### 🎨 Frontend (Guest-Facing)

- **Preloader Screen** — Animasi loading dengan dekorasi pendulum
- **Intro / Cover Screen** — Halaman pembuka dengan nama tamu & tombol "Buka Undangan"
- **Interactive Room** — Ruangan virtual dengan dekorasi yang bisa diklik
- **Night / Day Mode** — Toggle mode gelap dengan overlay transparan
- **Floating Wishes** — Ucapan tamu yang tampil bergantian secara otomatis
- **Music Player** — Background music otomatis saat masuk ruangan
- **Zoom Prevention** — Mencegah pinch-to-zoom dan Ctrl+/- agar layout konsisten

### 📋 Modal System

| Modal                | Fungsi                                     |
| -------------------- | ------------------------------------------ |
| **Welcome**          | Sambutan & daftar menu navigasi            |
| **Bride & Groom**    | Profil mempelai dengan card design         |
| **Gallery**          | Galeri foto prewedding                     |
| **Location**         | Waktu & tempat acara + link Google Maps    |
| **RSVP / Guestbook** | Form konfirmasi kehadiran + daftar ucapan  |
| **Gift**             | Info rekening untuk transfer digital       |
| **QR Code**          | QR Code kehadiran untuk check-in di hari H |

### 🔧 Admin Panel

- **Dashboard** (`/admin`) — Statistik RSVP & tabel data tamu
- **Login** (`/admin/login`) — Autentikasi untuk proteksi halaman admin
- **QR Scanner** (`/admin/scanner`) — Scan QR Code tamu untuk check-in

---

## 🛠️ Tech Stack

### Frontend

| Teknologi      | Fungsi                                            |
| -------------- | ------------------------------------------------- |
| **Vue.js 3**   | UI framework (Composition API + `<script setup>`) |
| **Vite**       | Build tool & dev server                           |
| **Pinia**      | State management                                  |
| **Vue Router** | Client-side routing                               |
| **qrcode.vue** | Generate QR Code SVG                              |

### Backend / Database

| Teknologi    | Fungsi                                                  |
| ------------ | ------------------------------------------------------- |
| **Supabase** | PostgreSQL database + REST API (langsung dari frontend) |

### Deployment

| Teknologi  | Fungsi                            |
| ---------- | --------------------------------- |
| **Vercel** | Hosting & auto-deploy dari GitHub |

### Admin Tools

| Teknologi        | Fungsi                                  |
| ---------------- | --------------------------------------- |
| **html5-qrcode** | Camera-based QR Code scanner di browser |

---

## 📁 Struktur Proyek

```
undangan-digital/
├── public/
│   └── assets/              # Static assets
│       ├── images/           # Foto mempelai, dekorasi room, gallery
│       ├── music/            # Background music & sound effects
│       └── preloader/        # Aset animasi preloader
│
├── supabase/
│   └── migration.sql         # SQL untuk setup tabel di Supabase
│
├── src/
│   ├── App.vue               # Root component (router-view)
│   ├── main.js               # Vue app entry point
│   ├── lib/supabase.js       # Supabase client config
│   ├── router/index.js       # Route definitions + auth guard
│   ├── stores/invitation.js  # Pinia store (state + Supabase queries)
│   ├── data/mockData.js      # Mock invitation config data
│   │
│   ├── views/
│   │   ├── InvitationView.vue       # Main invitation page (/)
│   │   └── admin/
│   │       ├── LoginView.vue        # Admin login (/admin/login)
│   │       ├── DashboardView.vue    # Admin dashboard (/admin)
│   │       └── ScannerView.vue      # QR scanner (/admin/scanner)
│   │
│   └── components/
│       ├── preloader/PreloaderScreen.vue
│       ├── intro/IntroScreen.vue
│       ├── room/
│       │   ├── InteractiveRoom.vue
│       │   ├── RoomDecoration.vue
│       │   └── FloatingWishes.vue
│       ├── modals/
│       │   ├── BaseModal.vue
│       │   ├── WelcomeModal.vue
│       │   ├── BrideGroomModal.vue
│       │   ├── GalleryModal.vue
│       │   ├── LocationModal.vue
│       │   ├── RSVPModal.vue
│       │   ├── GiftModal.vue
│       │   └── QRCodeModal.vue
│       └── ui/
│           ├── MusicPlayer.vue
│           └── NavigationControls.vue
│
├── .env.example              # Template environment variables
├── vercel.json               # Vercel SPA routing config
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- Akun **Supabase** (gratis)

### 1. Clone & Install

```bash
git clone https://github.com/aphroditealex/undangan-digital.git
cd undangan-digital
npm install
```

### 2. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → jalankan isi file `supabase/migration.sql`
3. Buka **Settings → API** → copy **Project URL** dan **anon public key**

### 3. Environment Variables

Buat file `.env` di root project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 4. Development

```bash
npm run dev
```

Aplikasi berjalan di: http://localhost:3000

### 5. Deploy ke Vercel

1. Push ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Tambahkan **Environment Variables** (`VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`)
4. Deploy 🎉

---

## 🗄️ Database (Supabase)

### Tabel `rsvp`

| Kolom       | Tipe        | Deskripsi               |
| ----------- | ----------- | ----------------------- |
| id          | UUID (PK)   | Auto generate           |
| code        | TEXT        | Kode unik tamu          |
| name        | TEXT        | Nama tamu               |
| phone       | TEXT        | Nomor telepon           |
| attendance  | TEXT        | `ACCEPT` atau `DECLINE` |
| guest_count | INTEGER     | Jumlah tamu (pax)       |
| message     | TEXT        | Ucapan/doa              |
| created_at  | TIMESTAMPTZ | Timestamp               |

### Tabel `messages`

| Kolom      | Tipe        | Deskripsi            |
| ---------- | ----------- | -------------------- |
| id         | UUID (PK)   | Auto generate        |
| rsvp_id    | UUID (FK)   | Relasi ke tabel rsvp |
| name       | TEXT        | Nama pengirim        |
| code       | TEXT        | Kode tamu            |
| message    | TEXT        | Isi ucapan           |
| created_at | TIMESTAMPTZ | Timestamp            |

---

## 🎯 Roadmap

- [x] Preloader, Intro Screen, Interactive Room
- [x] Modal system (Welcome, Bride-Groom, Gallery, Location, RSVP, Gift)
- [x] Night/Day mode toggle
- [x] Zoom prevention (keyboard, scroll, pinch)
- [x] RSVP form submission (Supabase)
- [x] QR Code generation untuk kehadiran
- [x] Admin Dashboard dengan statistik & tabel data
- [x] Admin authentication (login/logout)
- [x] QR Scanner untuk check-in tamu
- [x] Deploy ke Vercel
- [ ] Integrasi WhatsApp API untuk broadcast link
- [ ] Multi-template support
- [ ] Guest list management (CRUD dari admin)

---

## 📄 License

This project is for personal use.

---

<p align="center">
  Made with ❤️ for a special day
</p>
