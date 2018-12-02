import * as React from "react";
import { css } from "emotion";
import { Player as PlayerType } from "../../graphql/leaderboard";
import PlayerInfo from "./PlayerInfo";
import Stats from "./Stats";
import Graph from "./Graph";
import { createFilledHistorical } from "../../lib/historical";

const container = css`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;

  & > div {
    grid-column: auto auto;
    position: relative;
  }

  @media screen and (max-width: 1300px) {
    & > div {
      grid-column: 1 / 3;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    & > div {
      grid-column: auto auto;
    }
  }
`;

const DAYS_AMMOUNT_ON_GRAPH = 5;

type Props = {
  player?: PlayerType;
};
const Player: React.SFC<Props> = ({ player }) => {
  // if (!player) {
  //   return (
  //     <div className="container">
  //       <LoadingIcon />
  //     </div>
  //   );
  // }

  const historical = player
    ? createFilledHistorical(player.historical, DAYS_AMMOUNT_ON_GRAPH)
    : [];
  return (
    <div className={container}>
      <div className="info">
        <h4>Info</h4>
        <PlayerInfo player={player} />
      </div>
      <div className="stats">
        <h4>Stats</h4>
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
