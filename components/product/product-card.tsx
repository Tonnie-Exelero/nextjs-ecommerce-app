"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    description: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBuyNow = () => {
    if (!session) {
      // Redirect to login if not authenticated
      router.push(`/api/auth/signin?callbackUrl=/products/${product.id}`)
      return
    }

    setIsLoading(true)
    // Simulate adding to cart
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }, 1000)
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
        <p className="font-medium text-lg mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleBuyNow} disabled={isLoading}>
          {isLoading ? "Processing..." : "Buy Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}

