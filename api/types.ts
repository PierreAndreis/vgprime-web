export type Stats = Readonly<{
  kda: number;
  games: number;
  wins: number;
  duration: number;
  loss: number;
  winRate: number;
  kp: number;
  avgKills: number;
  totalKills: number;
  totalDeaths: number;
  avgAssists: number;
  totalAssists: number;
  avgCS: number;
  totalCS: number;
  blueGames: number;
  blueWins: number;
  blueWinRate: number;
  redGames: number;
  redWins: number;
  redWinRate: number;
}>;

export type LeaderboardRanking = {
  global: number;
  regional: number;
  points: number;
};

export type HeroesStats = Readonly<{
  type: "hero";
  name: string;
}> &
  Stats;

export type RolesStats = Readonly<{
  type: "role";
}> &
  Stats;

export type PlayedWith = Readonly<{
  name: string;
  wins: number;
  games: number;
  lastMatch: string;
}>;

export type PlayerStats = Readonly<{
  id: string;
  name: string;
  region: string;
  lastCache: string;
  tier: string;
  aka: [string];
  rankVst: string;
  blitzVst: string;
  rank5v5Vst: string;
  rankedRanking: LeaderboardRanking;
  ranked5v5Ranking: LeaderboardRanking;
  blitz5v5Ranking: LeaderboardRanking;
  seasonsAvailable: [string];
  gameModesAvailable: [string];
  filters: [string];
  stats: {
    type: "total";
    Heroes: [HeroesStats];
    Roles: [RolesStats];
    PlayedWith: [PlayedWith];
  } & Stats;
}>;
