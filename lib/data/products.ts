import { prisma } from "@/lib/prisma"
import { redis } from "@/lib/redis"

export async function getProductById(id: string) {
  // Try to get from cache first
//   const cachedProduct = await redis.get(`product:${id}`)
//   if (cachedProduct) {
//     return JSON.parse(cachedProduct as string)
//   }

  // If not in cache, get from database
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (product) {
    // Cache for 1 hour
    await redis.set(`product:${id}`, JSON.stringify(product), { ex: 3600 })
  }

  return product
}

export async function getFeaturedProducts() {
  // Try to get from cache first
//   const cachedProducts = await redis.get("featured-products")
//   if (cachedProducts) {
//     return JSON.parse(cachedProducts as string)
//   }

  // If not in cache, get from database
  const products = await prisma.product.findMany({
    where: { featured: true },
    take: 4,
  })

  // Cache for 1 hour
  await redis.set("featured-products", JSON.stringify(products), { ex: 3600 })

  return products
}

