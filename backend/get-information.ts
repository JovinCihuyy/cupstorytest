import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ambil data JSON
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../data/information.json"), "utf-8")
);

// export tool
export const getInformationTool = {
  name: "get_information",
  description: "Ambil informasi coffee shop",
  schema: {
    kategori: z.enum(["semua", "lokasi", "jam", "fasilitas", "pembayaran"]).optional()
  },
  handler: async ({ kategori }: any) => {

    if (!kategori || kategori === "semua") {
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
      };
    }

    let result: any = {};

    switch (kategori) {
      case "lokasi":
        result = data.lokasi;
        break;
      case "jam":
        result = data.jam_operasional; 
        break;
      case "fasilitas":
        result = data.fasilitas;
        break;
      case "pembayaran":
        result = data.pembayaran;
        break;
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
};