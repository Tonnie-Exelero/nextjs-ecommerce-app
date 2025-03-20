import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a new PrismaClient instance for the seed script
const prisma = new PrismaClient();

async function main() {
  // Clear existing products (optional)
  await prisma.product.deleteMany({});

  // Create sample products
  const products = [
    {
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with 30-hour battery life.",
      details:
        "Features include active noise cancellation, transparency mode, and high-quality audio drivers.",
      price: 199.99,
      imageUrl: "/images/headphones.jpg",
      featured: true,
      stock: 50,
    },
    {
      name: "Smartphone",
      description:
        "Latest model smartphone with advanced camera system and all-day battery life.",
      details:
        "Featuring a 6.1-inch OLED display, triple camera system, and the latest processor.",
      price: 899.99,
      imageUrl: "/images/smartphone.jpg",
      featured: true,
      stock: 30,
    },
    {
      name: "Laptop",
      description:
        "Powerful laptop for work and entertainment with stunning display.",
      details:
        "16-inch Retina display, 16GB RAM, 512GB SSD, and dedicated graphics card.",
      price: 1299.99,
      imageUrl: "/images/laptop.jpg",
      featured: true,
      stock: 20,
    },
    {
      name: "Smartwatch",
      description:
        "Track your fitness and stay connected with this premium smartwatch.",
      details:
        "Features include heart rate monitoring, GPS, water resistance, and a 3-day battery life.",
      price: 249.99,
      imageUrl: "/images/smartwatch.jpg",
      featured: true,
      stock: 40,
    },
  ];

  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Database seeded successfully!");
}

// Execute the main function
main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma client connection
    await prisma.$disconnect();
  });
