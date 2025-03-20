import { gql } from "@apollo/client"

export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: String!) {
    userOrders(userId: $userId) {
      id
      status
      total
      createdAt
    }
  }
`

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($id: String!) {
    order(id: $id) {
      id
      status
      total
      createdAt
      items {
        id
        quantity
        price
        product {
          id
          name
          imageUrl
        }
      }
    }
  }
`

