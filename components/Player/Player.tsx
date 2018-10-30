import * as React from "react";
import { css, keyframes } from "emotion";
import { Player as PlayerType } from "../../graphql/leaderboard";
import PlayerInfo from "./PlayerInfo";
import Stats from "./Stats";
import Graph from "./Graph";
import { CreateFilledHistorical } from "../../lib/historical";
import { FadeLoader as LoadingIcon } from "react-spinners";

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

  & > div {
    position: relative;
  }

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
    ? CreateFilledHistorical(player.historical, DAYS_AMMOUNT_ON_GRAPH)
    : [];
  return (
    <div className={container}>
      <div className="info">
        <h4>Info</h4>
        <PlayerInfo player={player} />
      </div>
      <div className="graph1">
        <h4>Points over time</h4>
        <Graph dataKey="points" title="Points" data={historical} />
      </div>
      <div className="stats">
        <h4>Stats</h4>
        <Stats player={player} />
      </div>
      <div className="graph2">
        <h4>Rank over time</h4>
        <Graph dataKey="rank" title="Rank" data={historical} />
      </div>
    </div>
  );
};

export default Player;
