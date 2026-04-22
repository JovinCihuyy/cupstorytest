<h1>Tugas Kelompok 1 <br></h1>
<h2>Cup-Story</h2>
<h3>Anggota Kelompok:</h3>
<h5>Jovin Maximilian Tay, Stefanus Rendy, Aurelius Adrian Pristio, Frederika Etanim</h5>

---

# ☕ Cup Story — Asisten Virtual Customer Service Cafe

> **Digital Cafe Chatbot** — Chatbot berbasis AI yang membantu pelanggan Cupstory Cafe menemukan menu, membuat pesanan, dan mendapatkan informasi cafe secara interaktif.

Aplikasi chatbot interaktif yang menggabungkan **AI Language Model (Ollama / llama3)** dengan **MCP (Model Context Protocol)** untuk memberikan layanan customer service cafe yang cepat, akurat, dan personal.

---

## ✨ Fitur Utama

- 🍵 **Lihat Menu** — Tampilkan daftar menu Kopi & Non-Kopi lengkap dengan harga, rating, dan deskripsi
- ⭐ **Rekomendasi Minuman** — Saran minuman terbaik berdasarkan kategori dan rating tertinggi
- 🕐 **Jam Operasional** — Informasi jam buka & tutup cafe per hari
- 📦 **Buat Pesanan** — Pesan minuman langsung dari chat
- 🗂️ **Cek Status Pesanan** — Lacak pesanan berdasarkan nama atau status
- 📍 **Info Cafe** — Alamat, kontak, fasilitas, dan metode pembayaran
- 💬 **AI Chat (Ollama)** — Tanya jawab natural dengan AI barista dalam Bahasa Indonesia

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Fungsi |
|-----------|--------|
| **Node.js** ≥18 | Runtime JavaScript |
| **TypeScript** | Type-safe development |
| **Express.js** ^5.x | HTTP server & REST API |
| **Ollama (llama3)** | Local AI Language Model |
| **MCP SDK** `@modelcontextprotocol/sdk` | Model Context Protocol server |
| **Zod** | Schema & parameter validation |
| **CORS** | Cross-origin resource sharing |

### Frontend
| Teknologi | Fungsi |
|-----------|--------|
| **HTML5** | Struktur halaman |
| **Tailwind CSS** | Utility-first CSS framework |
| **JavaScript (Vanilla)** | Logika interaktif |

---

## 📁 Struktur Proyek

```
cupstorytest/
├── README.md                    # Dokumentasi utama (file ini)
├── backend/                     # Backend Express + MCP
│   ├── app.ts                   # HTTP server, REST API & Ollama AI chat
│   ├── cupstory-data.ts         # Database menu, pesanan & helper functions
│   ├── get-information.ts       # MCP Tool: get_information (baca info.json)
│   └── mcp-server.ts            # MCP Server dengan 6 tools
├── public/                      # Frontend SPA
│   └── index.html               # Single-page app (HTML + CSS + JS)
├── data/
│   └── information.json         # Data lokasi, jam, fasilitas, pembayaran
├── node_modules/                # Dependencies (auto-generated)
├── .gitignore
├── package.json                 # Dependencies & scripts
├── package-lock.json
└── tsconfig.json                # TypeScript config
```

---

## 🏗️ Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                    │
│                   public/index.html                      │
│              HTML + Tailwind CSS + Vanilla JS            │
└──────────────────┬──────────────────┬───────────────────┘
                   │ POST /api/ai-chat │ GET|POST /api/*
                   ▼                  ▼
┌──────────────────────────────────────────────────────────┐
│              Backend — app.ts (Express :3000)            │
│                                                          │
│   REST Endpoints:         AI Chat:                       │
│   GET  /api/menu          POST /api/ai-chat              │
│   GET  /api/rekomendasi        │                         │
│   GET  /api/jam-operasional    ▼                         │
│   GET  /api/pesanan    Ollama llama3                     │
│   POST /api/pesan      (localhost:11434)                 │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│              MCP Server — mcp-server.ts                  │
│                                                          │
│  Tools:                                                  │
│  ├── get_menu              → cupstory-data.ts            │
│  ├── get_info              → cupstory-data.ts            │
│  ├── get_recom             → cupstory-data.ts            │
│  ├── get_jam_operasional   → cupstory-data.ts            │
│  ├── get_pesanan           → cupstory-data.ts            │
│  ├── post_pesan            → cupstory-data.ts            │
│  └── get_information       → data/information.json       │
└──────────────────────────────────────────────────────────┘
```

**Flow AI Chat:**
1. User mengirim pesan ke frontend
2. Frontend POST ke `/api/ai-chat`
3. `app.ts` membangun system prompt dengan data cafe + pesan user
4. Request dikirim ke Ollama `llama3` di `localhost:11434`
5. Ollama merespons dalam konteks Cupstory Cafe
6. Frontend menampilkan balasan dari AI barista

**Flow REST API:**
1. Frontend memanggil endpoint REST (menu, pesanan, dll)
2. `app.ts` memproses request dan mengembalikan data dari `cupstory-data.ts`

---

## 🚀 Quick Start

### Prasyarat
- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/)
- **Ollama** — [Download](https://ollama.com) (untuk fitur AI Chat)

### Instalasi & Setup

```bash
# 1. Clone repositori
git clone https://github.com/JovinCihuyy/cupstorytest.git

# 2. Masuk ke folder proyek
cd cupstorytest

# 3. Install dependencies
npm install
```

### Setup Ollama (AI Chat)

```bash
# Install dan jalankan Ollama
ollama serve

# Pull model llama3 (dilakukan sekali)
ollama pull llama3
```

### Jalankan Server

```bash
npm start
# 🚀 Server berjalan di http://localhost:3000
# 📡 Ollama harus running di http://localhost:11434
```

### Buka Aplikasi

```
Buka browser → http://localhost:3000
```

---

## 📡 API Endpoints

### 💬 POST `/api/ai-chat`
Chat dengan AI barista Cupstory.

**Request:**
```json
{
  "message": "Rekomendasiin minuman yang enak dong"
}
```
**Response:**
```json
{
  "message": "Cobain Signature Latte kita kak, bestseller banget ⭐ ..."
}
```

---

### 🍵 GET `/api/menu`
Ambil daftar menu, bisa filter berdasarkan kategori.

```
GET /api/menu
GET /api/menu?kategori=Kopi
GET /api/menu?kategori=Non-Kopi
```
**Response:**
```json
[
  { "nama": "Signature Latte", "kategori": "Kopi", "harga": 28000 },
  { "nama": "Caramel Macchiato", "kategori": "Kopi", "harga": 32000 }
]
```

---

### ⭐ GET `/api/rekomendasi`
Ambil rekomendasi minuman terbaik.

```
GET /api/rekomendasi
GET /api/rekomendasi?kategori=Non-Kopi
```

---

### 🕐 GET `/api/jam-operasional`
Cek jam buka cafe.

```
GET /api/jam-operasional
GET /api/jam-operasional?hari=Sabtu
```
**Response:**
```json
[{ "hari": "Sabtu", "buka": "07:30", "tutup": "23:00" }]
```

---

### 📦 POST `/api/pesan`
Buat pesanan baru.

**Request:**
```json
{
  "menu": "Signature Latte",
  "jumlah": 2
}
```
**Response:**
```json
{
  "message": "Pesanan 2 Signature Latte berhasil dibuat ☕"
}
```

---

### 🗂️ GET `/api/pesanan`
Cek daftar pesanan, bisa filter status atau nama.

```
GET /api/pesanan
GET /api/pesanan?status=Dalam Proses
GET /api/pesanan?nama=Rizky
```

---

## 🔧 MCP Tools (6 Tools)

MCP Server berjalan di `backend/mcp-server.ts` dan digunakan untuk integrasi AI tool calling.

| Tool | Parameter | Fungsi |
|------|-----------|--------|
| `get_menu` | `kategori?` (string) | Ambil daftar menu |
| `get_info` | — | Info cafe (alamat, kontak, fasilitas) |
| `get_recom` | `kategori?` (string) | Rekomendasi minuman terbaik |
| `get_jam_operasional` | `hari?` (string) | Jam buka & tutup per hari |
| `get_pesanan` | `status?`, `nama?` | Cek status pesanan |
| `post_pesan` | `menu`, `jumlah`, `nama?` | Buat pesanan baru |
| `get_information` | `kategori?` (semua/lokasi/jam/fasilitas/pembayaran) | Info lengkap dari JSON |

---

## 📊 Data Menu

| Nama | Kategori | Harga | Rating |
|------|----------|-------|--------|
| Signature Latte | Kopi | Rp 28.000 | ⭐ 4.9 |
| Caramel Macchiato | Kopi | Rp 32.000 | ⭐ 4.8 |
| Americano | Kopi | Rp 22.000 | ⭐ 4.7 |
| Matcha Latte | Non-Kopi | Rp 30.000 | ⭐ 4.8 |
| Chocolate Frappe | Non-Kopi | Rp 34.000 | ⭐ 4.9 |
| Lemon Tea | Non-Kopi | Rp 18.000 | ⭐ 4.6 |

---

## 📍 Info Cafe

| | |
|-|--|
| **Alamat** | Jl. Contoh No. 123, Pontianak |
| **WhatsApp** | +62 812-3456-7890 |
| **Instagram** | @cupstorycafe |
| **Fasilitas** | WiFi, Outdoor Area, AC Room, Power Outlet, Parking |
| **Jam Buka** | Senin–Kamis 08:00–22:00 \| Jumat 08:00–23:00 \| Sabtu 07:30–23:00 \| Minggu 07:30–22:00 |

---

## 🧪 Testing & Development

### Development Mode (auto-reload)
```bash
npm run dev
```

### Jalankan MCP Server Standalone
```bash
npm run mcp
```

### Manual Testing dengan cURL

```bash
# AI Chat
curl -X POST http://localhost:3000/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Menu apa yang paling enak?"}'

# Ambil semua menu
curl http://localhost:3000/api/menu

# Menu kopi saja
curl "http://localhost:3000/api/menu?kategori=Kopi"

# Buat pesanan
curl -X POST http://localhost:3000/api/pesan \
  -H "Content-Type: application/json" \
  -d '{"menu":"Signature Latte","jumlah":1}'

# Cek jam operasional hari Sabtu
curl "http://localhost:3000/api/jam-operasional?hari=Sabtu"
```

---

## 🔐 Keamanan

- ✅ **CORS Protection** — Express CORS middleware
- ✅ **Input Validation** — Zod schema validation pada semua MCP tools
- ✅ **Type Safety** — Full TypeScript dengan strict types
- ✅ **XSS-safe** — Tidak ada dangerouslySetInnerHTML; output disanitasi di frontend

---

## 🎯 Scripts Tersedia

```bash
npm start       # Jalankan server (production)
npm run dev     # Jalankan dengan watch mode (development)
npm run mcp     # Jalankan MCP server standalone
```

---

## 🤝 Kontribusi

Proyek ini adalah tugas kelompok untuk mempelajari:
- MCP (Model Context Protocol) architecture
- AI integration dengan Local Language Models (Ollama)
- Full-stack development dengan TypeScript & Express.js
- RESTful API design & tool-calling pattern

---

## 📄 Lisensi

MIT License © 2025

---

## 📞 Support & Questions

Untuk pertanyaan atau issues:
- [GitHub Issues](https://github.com/JovinCihuyy/cupstorytest/issues)

---

**Selamat menggunakan Cup Story! ☕ Nikmati pengalaman memesan minuman favoritmu dengan mudah!**
