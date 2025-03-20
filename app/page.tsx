import { ProductGrid } from "@/components/product/product-grid"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <FeaturedProducts />
      <ProductGrid />
    </main>
  )
}

