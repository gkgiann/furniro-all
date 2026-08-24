import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const initialProducts = [
  {
    sku: "SS001",
    name: "Asgaard Sofa",
    slug: "asgaard-sofa",
    category: "Living",
    price: 250000.0,
    discount: 0,
    description: "Luxury big sofa",
    fullDescription:
      "Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road. Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering.",
    additionalInfo:
      "General Dimensions: W: 250cm x D: 92cm x H: 80cm. Material: Solid Wood Frame, Premium Fabric Upholstery.",
    image: `AsgaardSofa.png`,
    additionalImages: JSON.stringify([
      `AsgaardSofa1.png`,
      `AsgaardSofa2.png`,
      `AsgaardSofa3.png`,
      `AsgaardSofa4.png`,
    ]),
    colors: JSON.stringify(["#816DFA", "#000000", "#B88E2F"]),
    sizes: JSON.stringify(["L", "XL", "XS"]),
    isNew: false,
  },
  {
    sku: "SS002",
    name: "Syltherine",
    slug: "syltherine",
    category: "Dining",
    price: 350000.0,
    discount: 30,
    description: "Stylish cafe chair",
    fullDescription:
      "A stylish and comfortable cafe chair designed for modern dining rooms and cafes. Built with high quality solid wood legs and durable seating surface.",
    additionalInfo:
      "Weight capacity: 120kg. Material: Beech wood and Molded Polypropylene.",
    image: `Syltherine.png`,
    additionalImages: JSON.stringify(["Syltherine1.png"]),
    colors: JSON.stringify(["#B88E2F", "#000000"]),
    sizes: JSON.stringify(["S", "M", "L"]),
    isNew: false,
  },
  {
    sku: "SS003",
    name: "Leviosa",
    slug: "leviosa",
    category: "Dining",
    price: 250000.0,
    discount: 0,
    description: "Stylish cafe chair",
    fullDescription:
      "Minimalist and ergonomic cafe chair with sleek contours. Perfect for home dining areas and commercial spaces.",
    additionalInfo: "Dimensions: 45 x 45 x 85 cm. Minimal assembly required.",
    image: `Leviosa.png`,
    additionalImages: JSON.stringify([`Leviosa1.png`]),
    colors: JSON.stringify(["#FFFFFF", "#000000"]),
    sizes: JSON.stringify(["M", "L"]),
    isNew: false,
  },
  {
    sku: "SS004",
    name: "Lolito",
    slug: "lolito",
    category: "Living",
    price: 140000.0,
    discount: 50,
    description: "Luxury big sofa",
    fullDescription:
      "Expansive luxury sofa crafted for ultimate relaxation in spacious living rooms. Upholstered in soft, premium linen blend fabric with deep cushioning.",
    additionalInfo: "Seating capacity: 4-5 adults. High-density foam padding.",
    image: `Lolito.png`,
    additionalImages: JSON.stringify([`Lolito1.png`]),
    colors: JSON.stringify(["#B88E2F", "#816DFA"]),
    sizes: JSON.stringify(["XL", "XXL"]),
    isNew: false,
  },
  {
    sku: "SS005",
    name: "Respira",
    slug: "respira",
    category: "Living",
    price: 500000.0,
    discount: 0,
    description: "Outdoor bar table and stool",
    fullDescription:
      "Weather-resistant outdoor bar table set complete with matching stools. Ideal for balconies, patios, and gardens.",
    additionalInfo: "UV-resistant powder coating. Rust-proof aluminum frame.",
    image: `Respira.png`,
    additionalImages: JSON.stringify([`Respira1.png`]),
    colors: JSON.stringify(["#000000", "#FFFFFF"]),
    sizes: JSON.stringify(["M"]),
    isNew: true,
  },
  {
    sku: "SS006",
    name: "Grifo",
    slug: "grifo",
    category: "Bedroom",
    price: 150000.0,
    discount: 0,
    description: "Night lamp",
    fullDescription:
      "Warm ambient night lamp featuring an elegant wooden base and soft cotton lampshade for cozy bedtime reading.",
    additionalInfo: "Voltage: 220V. Bulb type: E27 LED (included).",
    image: `Grifo.png`,
    additionalImages: JSON.stringify([`Grifo1.png`]),
    colors: JSON.stringify(["#B88E2F"]),
    sizes: JSON.stringify(["Standard"]),
    isNew: false,
  },
  {
    sku: "SS007",
    name: "Muggo",
    slug: "muggo",
    category: "Dining",
    price: 15000.0,
    discount: 0,
    description: "Small mug",
    fullDescription:
      "Handmade ceramic mug with matte finish. Retains heat effectively for coffee and tea lovers.",
    additionalInfo: "Capacity: 350ml. Dishwasher and microwave safe.",
    image: `Muggo.png`,
    additionalImages: JSON.stringify([`Muggo1.png`]),
    colors: JSON.stringify(["#000000", "#FFFFFF", "#816DFA"]),
    sizes: JSON.stringify(["350ml"]),
    isNew: true,
  },
  {
    sku: "SS008",
    name: "Pingky",
    slug: "pingky",
    category: "Bedroom",
    price: 140000.0,
    discount: 50,
    description: "Cute bed set",
    fullDescription:
      "Complete queen size bed frame and headboard with soft pastel velvet finish. Brings warmth and charm to any bedroom.",
    additionalInfo:
      "Fits Standard Queen Mattress (160x200cm). Solid pine slats included.",
    image: `Pingky.png`,
    additionalImages: JSON.stringify([`Pingky1.png`]),
    colors: JSON.stringify(["#816DFA", "#B88E2F"]),
    sizes: JSON.stringify(["Queen", "King"]),
    isNew: false,
  },
  {
    sku: "SS009",
    name: "Potty",
    slug: "potty",
    category: "Bedroom",
    price: 5000.0,
    discount: 0,
    description: "Minimalist flower pot",
    fullDescription:
      "Sleek terracotta ceramic flower pot designed for indoor succulents and houseplants.",
    additionalInfo: "Includes drainage hole and matching saucer dish.",
    image: `Potty.png`,
    additionalImages: JSON.stringify([`Potty1.png`]),
    colors: JSON.stringify(["#B88E2F", "#FFFFFF"]),
    sizes: JSON.stringify(["S", "M"]),
    isNew: true,
  },
];

const categories = ["Dining", "Living", "Bedroom"];
const generatedProducts = Array.from({ length: 23 }).map((_, index) => {
  const base = initialProducts[index % initialProducts.length];
  const itemNum = index + 10;
  const category = categories[index % categories.length];
  const price = base.price + index * 10000;
  return {
    sku: `SS${String(itemNum).padStart(3, "0")}`,
    name: `${base.name} Vol.${itemNum}`,
    slug: `${base.slug}-vol-${itemNum}`,
    category: category,
    price: price,
    discount: base.discount,
    description: base.description,
    fullDescription: base.fullDescription,
    additionalInfo: base.additionalInfo,
    image: base.image,
    additionalImages: base.additionalImages,
    colors: base.colors,
    sizes: base.sizes,
    isNew: index % 3 === 0 && !base.discount,
  };
});

async function main() {
  console.log("🌱 Iniciando o seed do banco de dados SQLite com Prisma...");

  await prisma.user.deleteMany();
  console.log("🧹 Usuários antigos removidos.");

  await prisma.product.deleteMany();
  console.log("🧹 Produtos antigos removidos.");

  const allProducts = [...initialProducts, ...generatedProducts];

  for (const product of allProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  const testPasswordHash = await bcrypt.hash("Test123!", 10);
  await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@furniro.test",
      passwordHash: testPasswordHash,
    },
  });
  console.log("👤 Usuário de teste criado: test@furniro.test / Test123!");

  console.log(
    `✅ Seed concluído com sucesso! Total de ${allProducts.length} produtos cadastrados com URLs do Cloudinary.`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Erro durante a execução do seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
