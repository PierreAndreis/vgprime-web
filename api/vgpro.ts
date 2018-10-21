import fetch from "isomorphic-unfetch";
import { PlayerStats, HeroesStats } from "./types";

export const getTopHeroesByPlayerName = async (
  playerName: string,
  heroesAmount: number = 5
) => {
  const defaultHeroes: HeroesStats[] = [];
  for (let i = 0; i < heroesAmount; i++) {
    defaultHeroes.push({ name: "" } as HeroesStats);
  }
  try {
    const res = await fetch(`https://api.vgpro.gg/player/${playerName}/stats`).then(r =>
      r.json()
    );
    const player = res as PlayerStats;
    const heroes = player.stats.Heroes;
    heroes.sort((h1, h2) => h2.games - h1.games);
    const topHeroes =
      heroes.length > heroesAmount ? heroes.slice(0, heroesAmount) : heroes;
    // while (topHeroes.length < heroesAmount) {
    //   topHeroes.push({ name: "" } as HeroesStats);
    // }
    for (let i = 0; i < topHeroes.length; i++) {
      defaultHeroes[i] = topHeroes[i];
    }
  } catch (e) {
    // Add sentry here!
  }
  return defaultHeroes;
};
