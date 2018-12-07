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
  query Leaderboard($page: Int, $name: String!) {
    leaderboard(page: $page, name: $name) {
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
  query Leaderboard($playerName: String, $name: String!) {
    leaderboard(playerName: $playerName, name: $name) {
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

export const list = gql`
  query LeaderboardList {
    leaderboardList {
      name
      start
      end
      count
    }
  }
`;
