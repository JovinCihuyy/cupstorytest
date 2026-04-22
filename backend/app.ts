import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// =====================
// DATA DUMMY
// =====================

let orders: any[] = [];

const menu = [
  { nama: "Espresso", kategori: "Kopi", harga: 18000 },
  { nama: "Latte", kategori: "Kopi", harga: 22000 },
  { nama: "Matcha Latte", kategori: "Non-Kopi", harga: 25000 },
];

const jam = [
  { hari: "Senin", buka: "08:00", tutup: "22:00" },
  { hari: "Selasa", buka: "08:00", tutup: "22:00" },
  { hari: "Sabtu", buka: "09:00", tutup: "23:00" },
];

const rekomendasi = [
  { nama: "Latte", alasan: "Best seller 🔥" },
  { nama: "Matcha Latte", alasan: "Segar & creamy" },
];

// =====================
// ROUTES
// =====================

// MENU
app.get("/api/menu", (req, res) => {
  const { kategori } = req.query;

  if (kategori) {
    return res.json(menu.filter(m => m.kategori === kategori));
  }

  res.json(menu);
});

// JAM OPERASIONAL
app.get("/api/jam-operasional", (req, res) => {
  const { hari } = req.query;

  if (hari) {
    return res.json(jam.filter(j => j.hari === hari));
  }

  res.json(jam);
});

// REKOMENDASI
app.get("/api/rekomendasi", (req, res) => {
  const { kategori } = req.query;

  if (kategori) {
    return res.json(
      rekomendasi.filter(r =>
        menu.find(m => m.nama === r.nama && m.kategori === kategori)
      )
    );
  }

  res.json(rekomendasi);
});

// PESANAN (GET)
app.get("/api/pesanan", (req, res) => {
  const { status, nama } = req.query;

  let result = orders;

  if (status) {
    result = result.filter(o => o.status === status);
  }

  if (nama) {
    result = result.filter(o => o.nama?.toLowerCase().includes(String(nama).toLowerCase()));
  }

  res.json(result);
});

// PESAN (POST)
app.post("/api/pesan", (req, res) => {
  const { menu: menuName, jumlah } = req.body;

  if (!menuName) {
    return res.status(400).json({ message: "Menu tidak boleh kosong" });
  }

  const order = {
    id: Date.now(),
    menu: menuName,
    jumlah: jumlah || 1,
    status: "Dalam Proses",
  };

  orders.push(order);

  res.json({
    message: `Pesanan ${order.jumlah} ${order.menu} berhasil dibuat ☕`,
  });
});

// =====================
// OLLAMA AI CHAT
// =====================

const OLLAMA_API = "http://localhost:11434/api/generate";

app.post("/api/ai-chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message harus berupa string" });
  }

  try {
    console.log("📨 Incoming AI request:", message);
    
    // Context untuk Ollama - kasih tahu tentang cafe
    const systemPrompt = `Kamu adalah chatbot customer service Cupstory Cafe. Jawab HANYA pertanyaan seputar cafe ini. Jangan keluar dari topik.

DATA CAFE:
- Menu Kopi: Signature Latte (28k), Caramel Macchiato (32k), Americano (22k)
- Menu Non-Kopi: Matcha Latte (30k), Chocolate Frappe (34k), Lemon Tea (18k)
- Jam buka: Senin-Kamis 08:00-22:00 | Jumat-Sabtu 08:00-23:00 | Minggu 07:30-22:00
- Rekomendasi: Signature Latte (bestseller ⭐), Chocolate Frappe (favorit pelanggan)
- Pembayaran: Cash, GoPay, OVO, Dana, QRIS, Kartu Kredit/Debit
- Lokasi: Jl. Contoh No. 123, Pontianak
- Instagram: @cupstorycafe | WhatsApp: +62 852-5007-3918
- Fasilitas: WiFi, Outdoor Area, AC Room, Power Outlet, Parkir

ATURAN:
1. Gunakan bahasa santai, ramah, dan sedikit kasual seperti barista kafe dan dalam gaya bahasa Indonesia sehari-hari.
2. Jangan jawab pertanyaan di luar topik cafe (politik, coding, dll)
3. Jika ditanya di luar topik, arahkan kembali ke menu/cafe
5. Maksimal 3-4 kalimat per jawaban

Pertanyaan user: ${message}`;

    console.log("🔄 Connecting to Ollama at:", OLLAMA_API);

    const response = await fetch(OLLAMA_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: systemPrompt,
        stream: false,
      }),
    });

    console.log("📡 Ollama response status:", response.status);

    if (!response.ok) {
      console.error("❌ Ollama error:", response.statusText);
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.response || "Maaf, saya tidak bisa menjawab.";

    console.log("✅ AI response received");

    res.json({
      message: aiResponse.trim(),
    });
  } catch (error) {
    console.error("🚨 Server error:", error);
    
    res.status(500).json({
      error: `Server error: ${error instanceof Error ? error.message : String(error)}\n\nPastikan Ollama sudah running:\n- Windows: Jalankan Ollama app\n- Terminal: ollama serve\n- URL: http://localhost:11434`,
    });
  }
});

// =====================
// SERVE FRONTEND
// =====================

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// =====================

app.listen(PORT, () => {
  console.log(`🚀 Backend jalan di http://localhost:${PORT}`);
  console.log(`📡 Tunggu Ollama running di http://localhost:11434`);
});