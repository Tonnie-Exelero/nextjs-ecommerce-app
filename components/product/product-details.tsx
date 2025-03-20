"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface ProductDetailsProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    description: string
    details: string
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=600&width=600"}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold mt-4">${product.price.toFixed(2)}</p>
        <div className="mt-6 space-y-4">
          <p className="text-muted-foreground">{product.description}</p>
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mt-6 mb-2">Product Details</h3>
            <p>{product.details}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="sm:w-1/2" onClick={handleBuyNow} disabled={isLoading}>
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
          <Button variant="outline" size="lg" className="sm:w-1/2">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

