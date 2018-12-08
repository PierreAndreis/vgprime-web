import * as React from "react";
import { css } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/player";

import boxCss from "../common/Box";
import TopHeroes from "./TopHeroes";

const container = css`
  ${boxCss};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 11px 30px;
`;

const info = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
  width: 100%;
  & i {
    color: #eaa900;
    font-size: 20px;
    margin-bottom: -3;
  }
  & .name {
    margin-left: 10px;
    font-size: 17px;
    font-family: "Roboto Condensed";
    font-weight: 700;
  }

  & .region {
    margin-left: 3px;
    font-size: 12px;
    color: rgba(100, 100, 100, 0.5);
    text-transform: uppercase;
    font-weight: bold;
  }
  & .points {
    padding: 8px 20px 8px 20px;
    background-color: #4a90e2;
    min-width: 100px;
    text-align: center;
    border-radius: 15px;
    margin-left: auto;
    justify-self: flex-end;
    font-size: 13px;
    color: rgba(20, 20, 20, 0.7);
    text-transform: uppercase;
    font-weight: 500;
    color: white;
  }
`;

const separator = css`
  height: 1px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const heroes = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
  & > span {
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export type Props = {
  player?: Player;
  playerName: string;
};

const PlayerInfo: React.FunctionComponent<Props> = ({ player, playerName }) => {
  return (
    <div className={container}>
      <div className={info}>
        <SkeletonWrapper width={20} height={20}>
          {() => <i className={`vg-rank-${player ? player.tier : ""}`} />}
        </SkeletonWrapper>

        <div className="name">
          <SkeletonWrapper height={15} width={100}>
            {() => (player ? player.name : "")}
          </SkeletonWrapper>
        </div>
        <div className="region">
          <SkeletonWrapper height={15} width={20}>
            {() => (player ? (player.region === "sg" ? "sea" : player.region) : "")}
          </SkeletonWrapper>
        </div>

        <div className="points">
          <SkeletonWrapper height={10} width={40}>
            {() => (player ? Number(player.points).toFixed(0) + " PTS" : "")}
          </SkeletonWrapper>
        </div>
      </div>
      <div className={separator} />
      <div className={heroes}>
        <span>TOP 5 HEROES</span>
        <TopHeroes playerName={playerName} />
      </div>
    </div>
  );
};

export default PlayerInfo;
