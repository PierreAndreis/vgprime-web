import { gql } from "apollo-boost";

export default gql`
  query GetHeroes($playerName: String!) {
    getHeroes(playerName: $playerName)
      @rest(type: "GetHeroes", path: "player/{args.playerName}/stats") {
      stats @type(name: "Stats") {
        Heroes @type(name: "Heroe") {
          name
          games
        }
      }
    }
  }
`;
