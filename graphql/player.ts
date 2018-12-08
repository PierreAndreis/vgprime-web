import { gql } from "apollo-boost";

export type PlayerHistorical = ReadonlyArray<{
  date: string;
  rank: number;
  points: number;
}>;

export type Player = {
  id: string;
  name: string;
  region: string;
  positionChange: number;
  mvp: number;
  tier: number;
  points: number;
  rank: number;
  games: number;
  wins: number;
  historical: PlayerHistorical;
};

export const playerHeroes = gql`
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

export const byName = gql`
  query player($playerName: String!) {
    player(name: $playerName) {
      id
      name
      region
      tier
      tier3v3
      tier5v5
      points
      mvp
      games
      wins
      historical {
        date
        rank
        points
      }
    }
  }
`;
