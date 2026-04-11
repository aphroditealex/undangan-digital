# 💍 Undangan Digital

Undangan pernikahan digital interaktif berbasis web dengan konsep **Interactive Room** — tamu dapat menjelajahi ruangan virtual, mengklik dekorasi untuk melihat informasi acara, mengisi RSVP, dan mengirim ucapan secara real-time.

Terinspirasi dari [abadikan.id](https://abadikan.id) template Aruma.

---

## ✨ Fitur Utama

### 🎨 Frontend (Guest-Facing)
- **Preloader Screen** — Animasi loading dengan dekorasi pendulum
- **Intro / Cover Screen** — Halaman pembuka dengan nama tamu & tombol "Buka Undangan"
- **Interactive Room** — Ruangan virtual dengan dekorasi yang bisa diklik untuk membuka informasi
- **Night / Day Mode** — Toggle mode gelap dengan overlay yang tidak mempengaruhi dekorasi
- **Floating Wishes** — Ucapan tamu yang tampil secara real-time dan bergantian
- **Music Player** — Background music otomatis saat masuk ruangan
- **Zoom Prevention** — Mencegah pinch-to-zoom dan Ctrl+/- agar layout tetap konsisten

### 📋 Modal System
| Modal | Fungsi |
|---|---|
| **Welcome** | Sambutan & daftar menu navigasi |
| **Bride & Groom** | Profil mempelai dengan card design |
| **Gallery** | Galeri foto prewedding |
| **Location** | Waktu & tempat acara + link Google Maps |
| **RSVP / Guestbook** | Form konfirmasi kehadiran + daftar ucapan |
| **Gift** | Info rekening untuk transfer digital |
| **QR Code** | QR Code kehadiran untuk check-in di hari H |

### 🔧 Backend & Admin
- **Express.js API** — REST API untuk RSVP, messages, dan auth
- **SQLite Database** — Penyimpanan data ringan tanpa setup server database
- **Real-time WebSocket** — Ucapan tamu muncul secara live ke semua viewer (Socket.IO)
- **Admin Dashboard** (`/admin`) — Statistik RSVP, tabel data tamu, dan tombol refresh
- **Admin Login** (`/admin/login`) — Autentikasi untuk proteksi halaman admin
- **QR Scanner** (`/admin/scanner`) — Scan QR Code tamu untuk check-in di hari H

---

## 🛠️ Tech Stack

### Frontend
| Teknologi | Versi | Fungsi |
|---|---|---|
| **Vue.js 3** | ^3.5 | UI framework (Composition API + `<script setup>`) |
| **Vite** | ^8.0 | Build tool & dev server |
| **Pinia** | ^3.0 | State management |
| **Vue Router** | ^5.0 | Client-side routing |
| **qrcode.vue** | ^3.8 | Generate QR Code SVG |
| **Socket.IO Client** | ^4.8 | Real-time WebSocket connection |

### Backend
| Teknologi | Versi | Fungsi |
|---|---|---|
| **Express.js** | ^5.2 | HTTP server & REST API |
| **better-sqlite3** | ^12.8 | SQLite database driver |
| **Socket.IO** | ^4.8 | WebSocket server untuk real-time wishes |
| **CORS** | ^2.8 | Cross-origin resource sharing |

### Admin Tools
| Teknologi | Fungsi |
|---|---|
| **html5-qrcode** | Camera-based QR Code scanner di browser |
| **concurrently** | Menjalankan frontend + backend secara bersamaan |

---

## 📁 Struktur Proyek

```
undangan-digital/
├── public/
│   └── assets/              # Static assets (gambar, musik, preloader)
│       ├── images/           # Foto mempelai, dekorasi room, gallery
│       ├── music/            # Background music & sound effects
│       └── preloader/        # Aset animasi preloader
│
├── server/                   # Backend Express.js
│   ├── index.js              # Entry point server + Socket.IO setup
│   ├── database.js           # SQLite config, queries, dan helpers
│   ├── undangan.db           # SQLite database file
│   └── routes/
│       ├── auth.js           # POST /api/v1/auth/login
│       ├── rsvp.js           # RSVP CRUD + check-in endpoint
│       └── messages.js       # GET guest messages/wishes
│
├── src/                      # Frontend Vue.js
│   ├── App.vue               # Root component (router-view)
│   ├── main.js               # Vue app entry point
│   ├── router/index.js       # Route definitions + auth guard
│   ├── stores/invitation.js  # Pinia store (state + API calls)
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
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (disarankan v20+)
- **npm** v9+

### Installation

```bash
# Clone repository
git clone https://github.com/aphroditealex/undangan-digital.git
cd undangan-digital

# Install dependencies
npm install
```

### Development

```bash
# Jalankan frontend (Vite) + backend (Express) secara bersamaan
npm run dev
```

Aplikasi akan berjalan di:
- 🌐 **Frontend**: http://localhost:3000
- ⚙️ **Backend API**: http://localhost:3001
- 🔐 **Admin Panel**: http://localhost:3000/admin

### Production Build

```bash
# Build frontend untuk production
npm run build

# Preview hasil build
npm run preview
```

---

## 🔑 API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Login admin |
| `POST` | `/api/v1/rsvp` | Submit RSVP + ucapan |
| `GET` | `/api/v1/rsvp` | Get semua data RSVP (admin) |
| `GET` | `/api/v1/rsvp/check?code=XXX` | Cek apakah kode sudah RSVP |
| `GET` | `/api/v1/rsvp/stats` | Statistik kehadiran |
| `POST` | `/api/v1/rsvp/check-in` | Check-in tamu via QR scan |
| `GET` | `/api/v1/messages` | Get daftar ucapan/wishes |
| `GET` | `/api/health` | Health check server |

### WebSocket Events
| Event | Direction | Deskripsi |
|---|---|---|
| `new_wish` | Server → Client | Broadcast ucapan baru secara real-time |

---

## 🗄️ Database

Menggunakan **SQLite** (`server/undangan.db`) — tidak perlu setup MySQL/PostgreSQL.

### Tabel `rsvp`
| Kolom | Tipe | Deskripsi |
|---|---|---|
| id | INTEGER (PK) | Auto increment |
| code | TEXT | Kode unik tamu |
| name | TEXT | Nama tamu |
| phone | TEXT | Nomor telepon |
| attendance | TEXT | `ACCEPT` atau `DECLINE` |
| guest_count | INTEGER | Jumlah tamu (pax) |
| message | TEXT | Ucapan/doa |
| created_at | TEXT | Timestamp |

### Tabel `messages`
| Kolom | Tipe | Deskripsi |
|---|---|---|
| id | INTEGER (PK) | Auto increment |
| rsvp_id | INTEGER (FK) | Relasi ke tabel rsvp |
| name | TEXT | Nama pengirim |
| code | TEXT | Kode tamu |
| message | TEXT | Isi ucapan |
| created_at | TEXT | Timestamp |

### Akses Database via Navicat
1. Buat koneksi baru → pilih **SQLite**
2. Type: **Existing Database File**
3. Database File: `D:\Projects\undangan-digital\server\undangan.db`
4. Username & Password: **kosongkan** (SQLite tidak memerlukan auth)

---

## 🎯 Roadmap

- [x] Preloader, Intro Screen, Interactive Room
- [x] Modal system (Welcome, Bride-Groom, Gallery, Location, RSVP, Gift)
- [x] Night/Day mode toggle
- [x] Zoom prevention (keyboard, scroll, pinch)
- [x] Backend API (Express + SQLite)
- [x] RSVP form submission ke server
- [x] QR Code generation untuk kehadiran
- [x] Real-time wishes via WebSocket (Socket.IO)
- [x] Admin Dashboard dengan statistik & tabel data tamu
- [x] Admin authentication (login/logout)
- [x] QR Scanner untuk check-in tamu di hari H
- [ ] Deploy ke VPS / cloud hosting
- [ ] Integrasi WhatsApp API untuk broadcast link undangan
- [ ] Multi-template support (selain Aruma)
- [ ] Guest list management (CRUD dari admin)

---

## 📄 License

This project is for personal use.

---

<p align="center">
  Made with ❤️ for a special day
</p>
