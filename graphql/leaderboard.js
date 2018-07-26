import gql from "graphql-tag";

export default gql`
  query Leaderboard($page: Int) {
    leaderboard(page: $page) {
      id
      name
      points
      rank
      region
      games
      wins
    }
  }
`;
