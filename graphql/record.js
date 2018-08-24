import gql from "graphql-tag";

export default gql`
  query Record($type: Type!, $limit: Int) {
    record(type: $type, limit: $limit) {
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
