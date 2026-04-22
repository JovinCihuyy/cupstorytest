import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  createPesanan,
  getInfo,
  getJamOperasional,
  getMenu,
  getPesanan,
  getRekomendasi
} from "./cupstory-data.js";

const server = new McpServer({
  name: "cupstory-mcp",
  version: "1.0.0"
});

// ===== GET MENU =====
server.tool(
  "get_menu",
  {
    kategori: z.string().optional()
  },
  async ({ kategori }: { kategori?: string }) => {
    const data = getMenu(kategori);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data)
        }
      ]
    };
  }
);

// ===== GET INFO =====
server.tool("get_info", {}, async () => {
  const data = getInfo();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data)
      }
    ]
  };
});

// ===== GET REKOMENDASI =====
server.tool(
  "get_recom",
  {
    kategori: z.string().optional()
  },
  async ({ kategori }: { kategori?: string }) => {
    const data = getRekomendasi(kategori);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data)
        }
      ]
    };
  }
);

// ===== GET JAM =====
server.tool(
  "get_jam_operasional",
  {
    hari: z.string().optional()
  },
  async ({ hari }: { hari?: string }) => {
    const data = getJamOperasional(hari);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data)
        }
      ]
    };
  }
);

// ===== GET PESANAN =====
server.tool(
  "get_pesanan",
  {
    status: z.string().optional(),
    nama: z.string().optional()
  },
  async ({ status, nama }: { status?: string; nama?: string }) => {
    const data = getPesanan({ status, nama });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data)
        }
      ]
    };
  }
);

// ===== POST PESAN =====
server.tool(
  "post_pesan",
  {
    menu: z.string(),
    jumlah: z.number().int().positive(),
    nama: z.string().optional()
  },
  async ({ menu, jumlah, nama }: { menu: string; jumlah: number; nama?: string }) => {
    const data = createPesanan({ menu, jumlah, nama });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data)
        }
      ]
    };
  }
);

// ===== START MCP =====
const transport = new StdioServerTransport();
await server.connect(transport);