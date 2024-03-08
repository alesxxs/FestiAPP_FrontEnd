import { gql } from "@apollo/client";

export const GET_USER = gql`
query GetUser($token: String!) {
    getUser(token: $token) {
      id
      name
      email
      created
    }
  }
`