import gql from "graphql-tag";

export default gql`
  query Record($type: Type!) {
    record(type: $type) {
      id
      name
      region
      wins
      games
      mvp
      points
      tier
    }
  }
`;
