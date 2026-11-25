import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const categoryNames = [
    "Elektronik",
    "Aksesoris Komputer",
    "Peralatan Kantor",
    "Audio",
    "Gaming",
  ];

  const categories = new Map<string, number>();
  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories.set(name, category.id);
  }

  const products = [
    {
      name: "Mouse Wireless Logitech M185",
      sku: "STK-MOU-001",
      description: "Mouse wireless untuk kebutuhan kerja harian.",
      price: 125000,
      stock: 24,
      category: "Aksesoris Komputer",
    },
    {
      name: "Keyboard Mechanical RGB",
      sku: "STK-KEY-001",
      description: "Keyboard mechanical dengan lampu RGB.",
      price: 450000,
      stock: 12,
      category: "Gaming",
    },
    {
      name: "Monitor LED 24 Inch",
      sku: "STK-MON-001",
      description: "Monitor Full HD 24 inci untuk kerja dan hiburan.",
      price: 1850000,
      stock: 8,
      category: "Elektronik",
    },
    {
      name: "USB Hub 4 Port",
      sku: "STK-USB-001",
      description: "USB hub empat port untuk laptop dan PC.",
      price: 85000,
      stock: 30,
      category: "Aksesoris Komputer",
    },
    {
      name: "Headset Stereo",
      sku: "STK-AUD-001",
      description: "Headset stereo dengan mikrofon.",
      price: 210000,
      stock: 15,
      category: "Audio",
    },
    {
      name: "Webcam Full HD",
      sku: "STK-WEB-001",
      description: "Webcam 1080p untuk meeting dan streaming.",
      price: 325000,
      stock: 10,
      category: "Elektronik",
    },
    {
      name: "Mouse Pad XL",
      sku: "STK-PAD-001",
      description: "Mouse pad ukuran besar dengan permukaan halus.",
      price: 95000,
      stock: 40,
      category: "Gaming",
    },
    {
      name: "Flashdisk 64GB",
      sku: "STK-FLS-001",
      description: "Flashdisk USB 64GB.",
      price: 75000,
      stock: 50,
      category: "Elektronik",
    },
    {
      name: "Stand Laptop Aluminium",
      sku: "STK-STD-001",
      description: "Stand laptop aluminium yang dapat disesuaikan.",
      price: 180000,
      stock: 18,
      category: "Peralatan Kantor",
    },
    {
      name: "Speaker Bluetooth Mini",
      sku: "STK-SPK-001",
      description: "Speaker Bluetooth portabel.",
      price: 275000,
      stock: 14,
      category: "Audio",
    },
    {
      name: "Kabel HDMI 2 Meter",
      sku: "STK-HDM-001",
      description: "Kabel HDMI 2 meter untuk monitor dan TV.",
      price: 65000,
      stock: 35,
      category: "Elektronik",
    },
    {
      name: "Controller Wireless",
      sku: "STK-CON-001",
      description: "Controller wireless untuk bermain game.",
      price: 390000,
      stock: 9,
      category: "Gaming",
    },
    {
      name: "Printer Inkjet",
      sku: "STK-PRN-001",
      description: "Printer inkjet untuk kebutuhan rumah dan kantor.",
      price: 1350000,
      stock: 6,
      category: "Peralatan Kantor",
    },
    {
      name: "Microphone USB",
      sku: "STK-MIC-001",
      description: "Mikrofon USB untuk recording dan meeting.",
      price: 520000,
      stock: 7,
      category: "Audio",
    },
    {
      name: "SSD External 500GB",
      sku: "STK-SSD-001",
      description: "SSD eksternal 500GB untuk penyimpanan data.",
      price: 875000,
      stock: 11,
      category: "Elektronik",
    },
    {
      name: "Cooling Pad Laptop",
      sku: "STK-CLP-001",
      description: "Cooling pad dengan kipas untuk laptop.",
      price: 160000,
      stock: 20,
      category: "Aksesoris Komputer",
    },
  ];

  for (const item of products) {
    const categoryId = categories.get(item.category);
    if (!categoryId)
      throw new Error(`Kategori tidak ditemukan: ${item.category}`);
    await prisma.product.upsert({
      where: { sku: item.sku },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        categoryId,
      },
      create: {
        name: item.name,
        sku: item.sku,
        description: item.description,
        price: item.price,
        stock: item.stock,
        categoryId,
      },
    });
  }

  const demoEmail = "f1d02410039@stockify.local";
  const demoPassword = "yola1234";
  const passwordHash = await bcrypt.hash(demoPassword, 10);
  await prisma.user.upsert({
    where: { email: demoEmail },
    update: { passwordHash },
    create: { email: demoEmail, passwordHash },
  });

  console.log("\nSeed data Stockify berhasil dibuat/diperbarui.");
  console.log(`Kategori: ${categoryNames.length}`);
  console.log(`Produk: ${products.length}`);
  console.log(`Akun demo: ${demoEmail}`);
  console.log(`Password demo: ${demoPassword}\n`);
}

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
