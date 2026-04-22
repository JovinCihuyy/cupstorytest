<h1>Tugas Kelompok 1</h1>
<h3>Cup-Story</h3>

### Anggota Kelompok:
##### Jovin Maximilian Tay, Stefanus Rendi, Aurelius Adrian Pristio, Frederika Etanim

---

# ☕ Cup Story — Asisten Virtual Cerita di Balik Minuman

> **Digital Beverage Storyteller** — Chatbot berbasis AI yang membantu Anda menjelajahi, menemukan, dan menikmati cerita di balik setiap minuman favorit Anda.

Aplikasi chatbot interaktif yang menggabungkan **AI Language Model (Ollama)** dengan **MCP (Model Context Protocol)** untuk memberikan rekomendasi, informasi, dan cerita seputar minuman secara akurat dan personal.

---

## ✨ Fitur Utama

- 🔍 **Cari Minuman** — Temukan informasi minuman berdasarkan nama atau kategori
- 🧋 **Lihat Bahan-Bahan** — Daftar lengkap bahan untuk setiap minuman
- 🎯 **Cari Berdasarkan Bahan** — Temukan minuman dari bahan yang Anda miliki
- 📅 **Rekomendasi Menu** — Saran minuman untuk pagi, siang, atau malam hari
- 📚 **Jelajahi Kategori** — Lihat semua kategori minuman yang tersedia
- 💬 **Chat Interface** — Tanya jawab dengan AI secara natural dalam Bahasa Indonesia
- 🎨 **UI Modern** — Desain dark theme yang elegant dan responsif

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Node.js** | ≥18 | Runtime JavaScript |
| **TypeScript** | ^5.x | Type-safe development |
| **Express.js** | ^5.x | HTTP server & REST API |
| **Ollama** | ^0.6.x | Client untuk LLM cloud |
| **MCP SDK** | ^1.x | Model Context Protocol |
| **Zod** | ^4.x | Schema validation |
| **CORS** | ^2.x | Cross-origin resource sharing |

### Frontend
| Teknologi | Fungsi |
|-----------|--------|
| **HTML5** | Struktur halaman |
| **Tailwind CSS** | Utility-first CSS framework |
| **Marked.js** | Markdown parser untuk respons AI |
| **DOMPurify** | XSS protection |
| **JavaScript (Vanilla)** | Logika interaktif |
| **Material Symbols** | Icon set |
| **Google Fonts** | Typography |

---

## 📁 Struktur Proyek

```
cupstorytest/
├── README.md                   # Dokumentasi utama (file ini)
├── backend/                    # Backend Express + MCP
│   ├── app.ts                  # HTTP server + Ollama integration
│   ├── cupstory-data.ts        # Database & data minuman
│   ├── get-information.ts      # Helper untuk mengambil informasi minuman
│   └── mcp-server.ts           # MCP Server dengan tools
├── public/                     # Frontend SPA
│   └── index.html              # Single-page app (HTML + CSS + JS)
├── node_modules/               # Dependencies (auto-generated)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies & scripts
├── package-lock.json           # Lockfile
└── tsconfig.json               # TypeScript config
```

---

## 🏗️ Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                    │
│            HTML + Tailwind CSS + Vanilla JS              │
│                   public/index.html                      │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP POST /api/chat
                             ▼
┌──────────────────────────────────────────────────────────┐
│              Backend (Express.js Server)                 │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  app.ts — HTTP API & Ollama Integration             │ │
│  └─────────────────────────────────────────────────────┘ │
│                       │                                  │
│        ┌──────────────┼──────────────┐                  │
│        │              │              │                  │
│        ▼              ▼              ▼                  │
│    MCP Client    Ollama Cloud   MCP Server             │
│                  (LLM)         (mcp-server.ts)         │
│                                     │                   │
│                    ┌────────────────┤                   │
│                    │                │                   │
│                    ▼                ▼                   │
│            cupstory-data.ts  get-information.ts        │
│            (Database)        (Info Helper)             │
└──────────────────────────────────────────────────────────┘
```

**Flow:**
1. User mengirim pesan ke frontend (`public/index.html`)
2. Frontend melakukan POST request ke `/api/chat`
3. `app.ts` menerima pesan dan mengirimnya ke Ollama LLM
4. Ollama mengakses MCP tools dari `mcp-server.ts`
5. Tools mengambil data dari `cupstory-data.ts` via `get-information.ts`
6. Ollama memberikan respons yang relevan tentang minuman
7. Frontend menampilkan respons dan render Markdown

---

## 🚀 Quick Start

### Prasyarat
- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/)
- **Ollama API Key** — Daftar di [ollama.com](https://ollama.com)

### Instalasi & Setup

```bash
# 1. Clone repositori
git clone https://github.com/JovinCihuyy/cupstorytest.git

# 2. Masuk ke folder proyek
cd cupstorytest

# 3. Install dependencies
npm install

# 4. Update API key di backend/app.ts
# const OLLAMA_API_KEY = "YOUR_ACTUAL_API_KEY_HERE";

# 5. Jalankan server
npm start
# Server berjalan di http://localhost:3000
```

### Menjalankan Frontend

```bash
# Frontend sudah serve otomatis oleh Express.js
# Buka browser ke http://localhost:3000
```

---

## 📡 API Endpoints

### POST `/api/chat`
Mengirim pesan chat dan menerima respons dari AI.

**Request:**
```json
{
  "message": "Ceritakan tentang kopi espresso",
  "sessionId": "user123"
}
```

**Response:**
```json
{
  "reply": "Espresso adalah minuman kopi yang diseduh dengan...",
  "sessionId": "user123"
}
```

### POST `/api/reset`
Reset sesi chat untuk user tertentu.

**Request:**
```json
{
  "sessionId": "user123"
}
```

### GET `/api/health`
Health check server status.

**Response:**
```json
{
  "status": "ok",
  "mcpConnected": true
}
```

---

## 🔧 MCP Tools

### `get-information`
Mengambil informasi lengkap tentang minuman dari database.

```
Source: backend/get-information.ts
Data  : backend/cupstory-data.ts
```

Dokumentasi lengkap tools → lihat **[backend/mcp-server.ts](backend/mcp-server.ts)**

---

## 🧪 Testing & Development

### Development Mode
```bash
npm run dev
# Menggunakan tsx watch untuk auto-reload
```

### Jalankan MCP Server Standalone
```bash
npm run mcp
# Untuk testing tools secara terpisah
```

### Manual Testing dengan cURL

```bash
# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Ceritakan tentang kopi espresso","sessionId":"test1"}'

# Test health check
curl http://localhost:3000/api/health

# Test reset session
curl -X POST http://localhost:3000/api/reset \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test1"}'
```

### Testing di Browser
1. Buka [http://localhost:3000](http://localhost:3000)
2. Coba pertanyaan seperti:
   - "Apa itu kopi espresso?"
   - "Bahan-bahan untuk membuat thai tea?"
   - "Rekomendasikan minuman untuk pagi hari"
   - "Ceritakan sejarah kopi"
   - "Saya punya susu dan gula, bisa bikin minuman apa?"

---

## 📊 Data Minuman

Database minuman tersimpan di `backend/cupstory-data.ts` dengan berbagai informasi:
- Deskripsi lengkap & cerita asal-usul
- Waktu penyajian ideal
- Daftar bahan lengkap
- Langkah-langkah pembuatan
- Tags untuk pencarian

---

## 🔐 Keamanan

- ✅ XSS Protection — Menggunakan DOMPurify untuk sanitasi HTML
- ✅ CORS Protection — Express CORS middleware
- ✅ Input Validation — Zod schema validation untuk parameters
- ✅ API Key Management — Gunakan environment variables untuk sensitive data

**Catatan:** Jangan commit API key ke repository. Gunakan `.env` file atau environment variables.

---

## 🎯 Scripts Tersedia

```bash
# Production
npm start          # Jalankan server dengan tsx

# Development
npm run dev        # Jalankan dengan watch mode

# Testing
npm run mcp        # Jalankan MCP server standalone
```

---

## 🤝 Kontribusi

Proyek ini adalah tugas kelompok untuk mempelajari:
- MCP (Model Context Protocol) architecture
- AI integration dengan Large Language Models
- Full-stack development dengan TypeScript
- RESTful API design

---

## 📄 Lisensi

MIT License © 2025

---

## 📞 Support & Questions

Untuk pertanyaan atau issues, silakan buka:
- [GitHub Issues](https://github.com/JovinCihuyy/cupstorytest/issues)

---

**Selamat menggunakan Cup Story! ☕ Semoga membantu Anda menemukan cerita di balik minuman favorit Anda!**
