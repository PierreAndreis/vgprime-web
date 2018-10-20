import axios from "axios";

export const getTopHeroesByPlayerName = async (
  playerName: string,
  heroesAmount: number = 5
) => {
  try {
    const stats = await axios.get(`https://api.vgpro.gg/player/${playerName}/stats`);
    const heroes = stats.data.stats.Heroes as any[];
    heroes.sort((h1: any, h2: any) => h2.games - h1.games);
    const topHeroes =
      heroes.length > heroesAmount ? heroes.slice(0, heroesAmount) : heroes;
    return topHeroes;
  } catch {
    return [];
  }
};
