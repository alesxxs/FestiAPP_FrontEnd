import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query Query($getGeneralFestId: ID!) {
    getGeneralFest(id: $getGeneralFestId) {
      id
      name
      initialDate
      image
      contentType
      userID
      country
    }
  }
`;
