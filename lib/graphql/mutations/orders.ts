import { gql } from "@apollo/client"

export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [CreateOrderItemInput!]!) {
    createOrder(items: $items) {
      id
      status
      total
      createdAt
    }
  }
`

