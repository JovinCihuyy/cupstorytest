export type MenuItem = {
  id: number;
  nama: string;
  kategori: "Kopi" | "Non-Kopi";
  harga: number;
  stok: number;
  rating: number;
  deskripsi: string;
};

export type InfoItem = {
  alamat: string;
  whatsapp: string;
  instagram: string;
  fasilitas: string[];
};

export type JamItem = {
  hari: string;
  buka: string;
  tutup: string;
  status: string;
};

export type OrderItem = {
  id: string;
  nama: string;
  menu: string;
  jumlah: number;
  status: "Dalam Proses" | "Selesai" | "Dibatalkan";
  createdAt: string;
};

export const info: InfoItem = {
  alamat: "Jl. Contoh No. 123, Pontianak",
  whatsapp: "+62 812-3456-7890",
  instagram: "@cupstorycafe",
  fasilitas: ["WiFi", "Outdoor Area", "AC Room", "Power Outlet", "Parking"]
};

export const jamOperasional: JamItem[] = [
  { hari: "Senin", buka: "08:00", tutup: "22:00", status: "Buka" },
  { hari: "Selasa", buka: "08:00", tutup: "22:00", status: "Buka" },
  { hari: "Rabu", buka: "08:00", tutup: "22:00", status: "Buka" },
  { hari: "Kamis", buka: "08:00", tutup: "22:00", status: "Buka" },
  { hari: "Jumat", buka: "08:00", tutup: "23:00", status: "Buka" },
  { hari: "Sabtu", buka: "07:30", tutup: "23:00", status: "Buka" },
  { hari: "Minggu", buka: "07:30", tutup: "22:00", status: "Buka" }
];

export const menu: MenuItem[] = [
  {
    id: 1,
    nama: "Signature Latte",
    kategori: "Kopi",
    harga: 28000,
    stok: 14,
    rating: 4.9,
    deskripsi: "Espresso lembut dengan susu creamy khas Cupstory."
  },
  {
    id: 2,
    nama: "Caramel Macchiato",
    kategori: "Kopi",
    harga: 32000,
    stok: 10,
    rating: 4.8,
    deskripsi: "Manis, wangi, dan aman buat yang suka kopi tapi takut pahit."
  },
  {
    id: 3,
    nama: "Americano",
    kategori: "Kopi",
    harga: 22000,
    stok: 18,
    rating: 4.7,
    deskripsi: "Kopi hitam bersih, simple, dan nggak banyak drama."
  },
  {
    id: 4,
    nama: "Matcha Latte",
    kategori: "Non-Kopi",
    harga: 30000,
    stok: 12,
    rating: 4.8,
    deskripsi: "Matcha lembut dengan rasa creamy."
  },
  {
    id: 5,
    nama: "Chocolate Frappe",
    kategori: "Non-Kopi",
    harga: 34000,
    stok: 9,
    rating: 4.9,
    deskripsi: "Dingin, manis, dan cocok buat healing palsu."
  },
  {
    id: 6,
    nama: "Lemon Tea",
    kategori: "Non-Kopi",
    harga: 18000,
    stok: 20,
    rating: 4.6,
    deskripsi: "Segar dan ringan."
  }
];

export const rekomendasiRules = {
  Kopi: ["Signature Latte", "Caramel Macchiato", "Americano"],
  "Non-Kopi": ["Matcha Latte", "Chocolate Frappe", "Lemon Tea"]
} as const;

export const pesanan: OrderItem[] = [
  {
    id: "ORD-1001",
    nama: "Rizky",
    menu: "Signature Latte",
    jumlah: 2,
    status: "Dalam Proses",
    createdAt: new Date().toISOString()
  },
  {
    id: "ORD-1002",
    nama: "Nadia",
    menu: "Matcha Latte",
    jumlah: 1,
    status: "Selesai",
    createdAt: new Date().toISOString()
  }
];

export function getMenu(kategori?: string) {
  const k = (kategori || "").toLowerCase().trim();

  if (!k) return menu;
  if (k.includes("kopi") && !k.includes("non")) {
    return menu.filter((item) => item.kategori === "Kopi");
  }

  if (k.includes("non")) {
    return menu.filter((item) => item.kategori === "Non-Kopi");
  }

  return menu.filter((item) => item.kategori.toLowerCase() === k);
}

export function getRekomendasi(kategori?: string) {
  const filteredMenu = getMenu(kategori);

  if (!filteredMenu.length) {
    return menu.slice(0, 3);
  }

  return filteredMenu
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

export function getInfo() {
  return info;
}

export function getJamOperasional(hari?: string) {
  const h = (hari || "").toLowerCase().trim();
  if (!h) return jamOperasional;
  return jamOperasional.filter((item) => item.hari.toLowerCase() === h);
}

export function getPesanan(filters?: { status?: string; nama?: string }) {
  const status = (filters?.status || "").toLowerCase().trim();
  const nama = (filters?.nama || "").toLowerCase().trim();

  return pesanan.filter((item) => {
    const matchStatus = !status || item.status.toLowerCase().includes(status);
    const matchNama = !nama || item.nama.toLowerCase().includes(nama);
    return matchStatus && matchNama;
  });
}

export function createPesanan(input: { menu: string; jumlah: number; nama?: string }) {
  const found = menu.find(
    (item) => item.nama.toLowerCase() === input.menu.toLowerCase().trim()
  );

  const order = {
    id: `ORD-${Date.now()}`,
    nama: input.nama?.trim() || "Guest",
    menu: found?.nama || input.menu,
    jumlah: Math.max(1, input.jumlah || 1),
    status: "Dalam Proses" as const,
    createdAt: new Date().toISOString()
  };

  pesanan.unshift(order);

  return {
    message: `Pesanan ${order.menu} x${order.jumlah} berhasil dibuat.`,
    order
  };
}