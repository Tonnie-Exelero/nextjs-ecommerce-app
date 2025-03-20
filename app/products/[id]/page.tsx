import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product/product-details"
import { ProductRecommendations } from "@/components/product/product-recommendations"
import { getProductById } from "@/lib/data/products"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
        <ProductDetails product={product} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full mt-10" />}>
        <ProductRecommendations currentProductId={params.id} />
      </Suspense>
    </div>
  )
}

