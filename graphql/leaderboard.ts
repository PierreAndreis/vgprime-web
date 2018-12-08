import gql from "graphql-tag";

import { Player } from "./player";

export type PlayersList = ReadonlyArray<Player>;

export const byPage = gql`
  query Leaderboard($page: Int, $type: String!, $playerName: String) {
    leaderboard(page: $page, type: $type, playerName: $playerName) {
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
