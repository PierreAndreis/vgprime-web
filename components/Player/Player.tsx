import * as React from "react";
import { css } from "emotion";
import { Query } from "react-apollo";

import { SkeletonContext } from "../common/Skeleton";
import { byName as qPlayerByName } from "../../graphql/player";
import Info from "./Info";
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

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const DAYS_ON_GRAPH = 5;

type Props = {
  playerName: string;
};
const Player: React.SFC<Props> = ({ playerName }) => (
  <Query query={qPlayerByName} variables={{ playerName }}>
    {({ data, loading }) => {
      let player;

      if (data) {
        player = data.player;
      }

      const historical = player
        ? createFilledHistorical(player.historical, DAYS_ON_GRAPH)
        : [];

      return (
        <SkeletonContext.Provider value={loading}>
          <div className={container}>
            <div className="info">
              <h4>Info</h4>
              <Info player={player} playerName={playerName} />
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
        </SkeletonContext.Provider>
      );
    }}
  </Query>
);

export default Player;
