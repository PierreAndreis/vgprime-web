import * as React from "react";
import { css, keyframes } from "emotion";
import { Player as PlayerType } from "../../graphql/leaderboard";
import PlayerInfo from "./PlayerInfo";
import Stats from "./Stats";
import Graph from "./Graph";
import { ListDatesFromToday, IsSameDay, DaysBetween } from "../../lib/date-management";

// layout:
// info   stats
// graph1 graph2

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const container = css`
  display: grid;
  margin: 0;
  width: 100%;
  box-sizing: box;
  grid-template-areas:
    "info stats"
    "graph1 graph2";
  grid-template-rows: 100px 200px;
  grid-template-columns: 50% 1fr;
  grid-gap: 15px;
  animation: ${fadeIn} 0.5s ease;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    & > div {
      flex-grow: 1;
    }
  }
`;

const info = css`
  grid-area: info;
`;

const stats = css`
  grid-area: stats;
`;

const graph1 = css`
  grid-area: graph1;
`;
const graph2 = css`
  grid-area: graph2;
`;

const DAYS_AMMOUNT_ON_GRAPH = 5;

export type Historical = {
  date: string;
  rank: number;
  points: number;
};

const FindRank = (dt: Date, historical: any) => {
  let index = -1;
  for (let i = historical.length - 1; i >= 0; i--) {
    if (DaysBetween(dt, new Date(historical.date)) >= 0) {
      index = i;
      continue;
    }
    index = i;
    break;
  }
  return index > -1 ? historical[index].rank : -1;
};

type Props = {
  player?: PlayerType;
};

const Player: React.SFC<Props> = ({ player }) => {
  const fullHistorical = player
    ? Object.values(player.historical).map((val: any) => {
        return val as Historical;
      })
    : [];
  const historical = [] as Historical[];
  const neededDates = ListDatesFromToday(DAYS_AMMOUNT_ON_GRAPH);
  for (const d of neededDates) {
    const hist = fullHistorical.find(h => IsSameDay(new Date(h.date), d));
    if (hist) {
      historical.push({ ...hist, date: new Date(hist.date).toLocaleDateString() });
      continue;
    }
    historical.push({ date: d.toLocaleDateString(), rank: -1, points: 0 });
  }

  for (let i = 0; i < historical.length; i++) {
    if (historical[i].rank > 0) continue;
    historical[i].rank = FindRank(new Date(historical[i].date), fullHistorical);
  }
  return (
    <div className={container}>
      <div className={info}>
        <h4>Player Info</h4>
        <PlayerInfo player={player} />
      </div>
      <div className={stats}>
        <h4>Player Stats</h4>
        <Stats player={player} />
      </div>
      <div className={graph1}>
        <h4>Points over time</h4>
        <Graph dataKey="points" title="Points" data={historical} />
      </div>
      <div className={graph2}>
        <h4>Rank over time</h4>
        <Graph dataKey="rank" title="Rank" data={historical} />
      </div>
    </div>
  );
};

export default Player;
