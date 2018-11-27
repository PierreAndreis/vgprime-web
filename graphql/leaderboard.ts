import gql from "graphql-tag";
import { dbHistoricalList } from "./../lib/historical";

export interface Player {
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
  historical: dbHistoricalList;
}

export type PlayersList = ReadonlyArray<Player>;

export const byPage = gql`
  query Leaderboard($page: Int) {
    leaderboard(page: $page) {
      id
      name
      region
      positionChange
      mvp
      tier
      points
      rank
      region
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

export const byPlayerName = gql`
  query Leaderboard($playerName: String) {
    leaderboard(playerName: $playerName) {
      id
      name
      region
      positionChange
      mvp
      tier
      points
      rank
      region
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
