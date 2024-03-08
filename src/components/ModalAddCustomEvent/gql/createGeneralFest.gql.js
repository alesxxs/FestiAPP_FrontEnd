import { gql } from "@apollo/client";

export const CREATE_GENERAL_FEST = gql`
mutation CreateGeneralFest($input: generalFestInput) {
    createGeneralFest(input: $input) {
      id
      name
      initialDate
      image
      contentType
      isTicketMaster
      userID
      country
    }
  }
`