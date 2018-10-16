import * as React from "react";
import { css } from "emotion";
import { Player as PlayerType } from "../../graphql/leaderboard";
import PlayerInfo from "./PlayerInfo";
import Stats from "./Stats";
import Graph from "./Graph";
import { SkeletonWrapper } from "../common/Skeleton";

// layout:
// info   stats
// graph1 graph2

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

type Props = {
  player?: PlayerType;
};

const Player: React.SFC<Props> = ({ player }) => {
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
          <Graph dataKey="points" player={player}/>
        </div>
        <div className={graph2}>
          <h4>Rank over time</h4>
          <Graph dataKey="rank" player={player}/>
        </div>
      </div>
  );
};

export default Player;
