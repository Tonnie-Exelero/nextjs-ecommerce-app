import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    featuredProducts {
      id
      name
      description
      price
      imageUrl
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      details
      price
      imageUrl
      stock
    }
  }
`

export const GET_PRODUCT_RECOMMENDATIONS = gql`
  query GetProductRecommendations($productId: String!) {
    recommendedProducts(productId: $productId) {
      id
      name
      description
      price
      imageUrl
    }
  }
`

