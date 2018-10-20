import fetch from "isomorphic-unfetch";
import { PlayerStats } from "./types";

export const getTopHeroesByPlayerName = async (
  playerName: string,
  heroesAmount: number = 5
) => {
  try {
    const res = await fetch(`https://api.vgpro.gg/player/${playerName}/stats`).then(r =>
      r.json()
    );
    const player = res as PlayerStats;
    const heroes = player.stats.Heroes;
    heroes.sort((h1, h2) => h2.games - h1.games);
    const topHeroes =
      heroes.length > heroesAmount ? heroes.slice(0, heroesAmount) : heroes;
    return topHeroes;
  } catch (e) {
    // Add sentry here!
    return [];
  }
};
