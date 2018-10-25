import * as React from "react";
import { css, keyframes } from "emotion";
import { Player as PlayerType } from "../../graphql/leaderboard";
import PlayerInfo from "./PlayerInfo";
import Stats from "./Stats";
import Graph from "./Graph";
import { ListDatesFromToday } from "../../lib/date-management";

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
  width: 100%;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  animation: ${fadeIn} 0.5s ease;

  @media screen and (max-width: 1300px) {
    .graph1,
    .graph2 {
      grid-column: 1 / 3;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    .graph1,
    .graph2 {
      grid-column: 1;
    }
  }
`;

// const containerOld = css`
//   display: grid;
//   margin: 0;
//   width: 100%;
//   box-sizing: border-box;
//   grid-template-areas:
//     "info stats"
//     "graph1 graph2";
//   grid-template-rows: auto 200px;
//   grid-template-columns: 50% 1fr;
//   grid-gap: 15px;
//   grid-auto-rows: minmax(100px, auto);
//   animation: ${fadeIn} 0.5s ease;
//   /*& > div {
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     & > div {
//       flex-grow: 1;
//     }
//     */
//   }

//   @media screen and (max-width: 1300px) {
//     grid-template:
//       "info stats"
//       "graph1 graph1" auto
//       "graph2 graph2" auto
//       / 360px 1fr;
//   }

//   @media screen and (max-width: 800px) {
//     width: 380px;
//     padding: 0;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }
// `;

const DAYS_AMMOUNT_ON_GRAPH = 5;

export type Historical = {
  date: string;
  rank: number;
  points: number;
};

const FindHistorical = (dt: Date, historical: Historical[]) => {
  const strDt = dt.toLocaleDateString();
  let hist: Historical | undefined;
  for (let h of historical) {
    if (h.date === strDt) {
      hist = h;
      break;
    }
  }
  if (!hist) {
    for (let h of historical.slice().reverse()) {
      if (new Date(h.date) < new Date(strDt)) {
        hist = h;
        break;
      }
    }
    if (!hist) {
      for (let h of historical) {
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
  return hist;
};

const extractDate = (date: string) => {
  const arr = date.split("/");
  return new Date(+arr[2], +arr[0], +arr[1]);
};

const generateHistorical = (historicalObject: any) => {
  if (!historicalObject) return [];
  const fullHistorical = Object.keys(historicalObject).map((key: string) => {
    const value = historicalObject[key];
    let hasDateInside = false;
    if ("date" in value) hasDateInside = true;
    const date = hasDateInside
      ? new Date(value.date).toLocaleDateString()
      : extractDate(key).toLocaleDateString();
    return {
      date,
      rank: value.rank,
      points: value.points,
    };
  });
  fullHistorical.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  while (fullHistorical.length > DAYS_AMMOUNT_ON_GRAPH) {
    fullHistorical.shift();
  }
  const historical: Array<Historical> = [];
  if (fullHistorical.length >= 1) {
    const neededDates = ListDatesFromToday(DAYS_AMMOUNT_ON_GRAPH);
    for (const d of neededDates) {
      historical.push(FindHistorical(d, fullHistorical));
    }
  }
  return historical;
};

type Props = {
  player: PlayerType;
};
const Player: React.SFC<Props> = ({ player }) => {
  const historical =
    player && player.id !== "" ? generateHistorical(player.historical) : [];
  return (
    <div className={container}>
      <div className="info">
        <h4>Player Info</h4>
        <PlayerInfo player={player} />
      </div>
      <div className="stats">
        <h4>Player Stats</h4>
        <Stats player={player} />
      </div>
      <div className="graph1">
        <h4>Points over time</h4>
        <Graph dataKey="points" title="Points" data={historical} />
      </div>
      <div className="graph2">
        <h4>Rank over time</h4>
        <Graph dataKey="rank" title="Rank" data={historical} />
      </div>
    </div>
  );
};

export default Player;
