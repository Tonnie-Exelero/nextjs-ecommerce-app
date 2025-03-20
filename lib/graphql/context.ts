import { prisma } from "@/lib/prisma"

export function createContext({ req, session }: { req: Request; session: any }) {
  return {
    prisma,
    session,
  }
}

