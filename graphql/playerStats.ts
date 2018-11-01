import { gql } from "apollo-boost";

export default gql`
  query playerStats($playerName: String!) {
    playerStats(playerName: $playerName)
      @rest(type: "GetHeroes", path: "player/{args.playerName}/stats") {
      stats @type(name: "Stats") {
        Heroes @type(name: "Hero") {
          name
          games
        }
      }
    }
  }
`;
