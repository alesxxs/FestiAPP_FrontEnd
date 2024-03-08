import { gql } from "@apollo/client";

export const AUTHENTICATE_USER = gql`
  mutation Mutation($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

export const CREATE_NEW_ACCOUNT = gql`
  mutation Mutation($input: UserInput) {
    createUser(input: $input) {
      id
      name
      email
      created
    }
  }
`;
