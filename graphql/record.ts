import gql from "graphql-tag";

export interface Record {
  id: string;
  name: string;
  region: string;
  wins: number;
  games: number;
  mvp: number;
  points: number;
  tier: number;
}

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
