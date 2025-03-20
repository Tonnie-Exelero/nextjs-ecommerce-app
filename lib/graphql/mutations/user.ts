import { gql } from "@apollo/client"

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: String!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      id
      name
      email
      phone
      address
    }
  }
`

