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

const FindHistorical = (dt: Date, historical: Historical[]) => {
  const strDt = dt.toLocaleDateString();
  console.log(`Searching for ${strDt} on historical...`);
  console.log("Historical: ", historical);
  let hist: Historical | undefined;
  for (let h of historical) {
    console.log(h);
    if (h.date === strDt) {
      hist = h;
      break;
    }
  }
  if (!hist) {
    console.log(
      "Historical not found on list. We will search the nearest LESS date to get the RANK."
    );
    for (let h of historical) {
      if (new Date(h.date) < new Date(strDt)) {
        hist = h;
        break;
      }
    }
    if (!hist) {
      console.log(
        "Less date historical not found, we will try to get the nearest MORE date to get the RANK."
      );
      for (let h of historical.slice().reverse()) {
        if (new Date(h.date) > new Date(strDt)) {
          hist = h;
        }
      }
    }
    if (hist) {
      hist = JSON.parse(JSON.stringify(hist)) as Historical;
      hist.date = strDt;
      hist.points = 0;
    }
  }

  if (!hist) {
    hist = {
      date: strDt,
      points: 0,
      rank: -1,
    } as Historical;
  }
  // console.log("Historical: ", historical);
  // if (!hist && historical.length > 0) {
  //   console.log(
  //     "Not found! Now we will search the nearest hist with LESS date than the searching one to get the rank"
  //   );
  //   hist = historical
  //     .slice()
  //     .reverse()
  //     .find(h => new Date(h.date) < new Date(strDt));
  //   if (!hist) {
  //     console.log(
  //       "Not found! Now we we will search the nearest hist with MORE date than the searching one to get the rank"
  //     );
  //     hist = historical.slice().find(h => new Date(h.date) > new Date(strDt));
  //   }
  //   if (hist) {
  //     console.log("Found! Setting points to zero!");
  //     hist.date = strDt;
  //     hist.points = 0;
  //   }
  // }
  // if (!hist) {
  //   console.log("Not found! Setting default object (rank -1, points 0)...");
  //   hist = {
  //     date: strDt,
  //     rank: -1,
  //     points: 0,
  //   };
  // }
  return hist;
};

const FindRank = (dt: Date, historical: Historical[]) => {
  const startDt = new Date(dt.toLocaleDateString());
  const reversedHistorical = historical.slice().reverse();
  let hist = reversedHistorical.find(h => new Date(h.date) < startDt);
  if (!hist) {
    hist = historical.find(h => new Date(h.date) > startDt);
  }
  console.log(`Finding rank for ${dt.toLocaleDateString()}...`);
  if (hist) console.log("Rank found!", hist.rank);
  if (!hist) console.log("Rank not found!");
  if (hist) return hist.rank;
  return -1;
  // let index = -1;
  // for (let i = historical.length - 1; i >= 0; i--) {
  //   if (DaysBetween(dt, new Date(historical.date)) >= 0) {
  //     index = i;
  //     continue;
  //   }
  //   index = i;
  //   break;
  // }
  // return index > -1 ? historical[index].rank : -1;
};

const generateHistorical = (historicalObject: any) => {
  const fullHistorical = Object.values(historicalObject).map((val: any) => {
    return {
      date: new Date(val.date).toLocaleDateString(),
      rank: val.rank,
      points: val.points,
    } as Historical;
  });
  while (fullHistorical.length > 5) {
    fullHistorical.pop();
  }
  console.log("fullHistorical: ", fullHistorical);
  const historical: Array<Historical> = [];
  const neededDates = ListDatesFromToday(DAYS_AMMOUNT_ON_GRAPH);
  for (const d of neededDates) {
    // const hist = fullHistorical.find(h => IsSameDay(new Date(h.date), d));
    // if (hist) {
    //   historical.push({ ...hist, date: new Date(hist.date).toLocaleDateString() });
    //   continue;
    // }
    // historical.push({ date: d.toLocaleDateString(), rank: -1, points: 0 });
    historical.push(FindHistorical(d, fullHistorical));
  }
  console.log("fullHistorical: ", fullHistorical);
  // for (let i = 0; i < historical.length; i++) {
  //   if (historical[i].rank > 0) continue;
  //   historical[i].rank = FindRank(new Date(historical[i].date), fullHistorical);
  // }
  return historical;
};

type Props = {
  player?: PlayerType;
};
const Player: React.SFC<Props> = ({ player }) => {
  const historical = player ? generateHistorical(player.historical) : [];
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
