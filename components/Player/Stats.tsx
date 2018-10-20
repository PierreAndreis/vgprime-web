import * as React from "react";
import { Player } from "../../graphql/leaderboard";
import { css } from "emotion";
import boxCss from "./../common/Box";
import { SkeletonWrapper } from "../common/Skeleton";

const container = css`
  ${boxCss};
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 79%;
`;

const info = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-grow: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  &:last-of-type {
    border-right: 0;
  }
`;

const value = css`
  font-size: 20px;
  font-weight: bold;
  padding: 5px;
`;

const description = css`
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
`;

type Props = {
  player?: Player;
};

const infoWidth = 40;
const infoHeight = 25;

const Stats: React.SFC<Props> = ({ player }) => {
  return (
    <div className={container}>
      <div className={info}>
        <span className={value}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.wins : 0)}
          </SkeletonWrapper>
        </span>
        <span className={description}>Wins</span>
      </div>
      <div className={info}>
        <span className={value}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.games - player.wins : 0)}
          </SkeletonWrapper>
        </span>
        <span className={description}>Losses</span>
      </div>
      <div className={info}>
        <span className={value}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.mvp : 0)}
          </SkeletonWrapper>
        </span>
        <span className={description}>MVPs</span>
      </div>
      <div className={info}>
        <span className={value}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.games : 0)}
          </SkeletonWrapper>
        </span>
        <span className={description}>Games</span>
      </div>
    </div>
  );
};

export default Stats;
