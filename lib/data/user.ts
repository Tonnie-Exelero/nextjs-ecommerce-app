import { prisma } from "@/lib/prisma"

export async function getUserProfile(userId: string) {
  return prisma.customer.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
    },
  })
}

