"use client";

import { useQuery } from "@apollo/client";
import { GET_FEATURED_PRODUCTS } from "@/lib/graphql/queries/products";
import { ProductCard } from "@/components/product/product-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProducts() {
  const { data, loading, error } = useQuery(GET_FEATURED_PRODUCTS);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <p className="text-red-500">Failed to load featured products</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.featuredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
