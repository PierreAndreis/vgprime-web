import * as React from "react";
import { Player } from "../../graphql/leaderboard";
import { css } from "@emotion/core";
import boxCss from "./../common/Box";
import { SkeletonWrapper } from "../common/Skeleton";

import { buttonCss } from "../common/Button";

const container = css`
  ${boxCss};
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 130px;
  width: 100%;
`;

const info = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-grow: 1;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
  width: 100%;

  &:last-of-type {
    border-right: 0;
  }
`;

const value = css`
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
`;

const description = css`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  color: #adadad;
`;

const moreButton = css`
  ${buttonCss};
  width: 180px;
  position: absolute;
  bottom: -15px;
  padding: 10px 10px;
  left: 50%;
  transform: translateX(-50%);
`;

type Props = {
  player?: Player;
};

const infoWidth = 50;
const infoHeight = 25;

const Stats: React.SFC<Props> = ({ player }) => {
  return (
    <div css={[container]}>
      <div css={[info]}>
        <span css={[value]}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.wins : 0)}
          </SkeletonWrapper>
        </span>
        <span css={[description]}>Wins</span>
      </div>
      <div css={[info]}>
        <span css={[value]}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.games - player.wins : 0)}
          </SkeletonWrapper>
        </span>
        <span css={[description]}>Losses</span>
      </div>
      <div css={[info]}>
        <span css={[value]}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.mvp : 0)}
          </SkeletonWrapper>
        </span>
        <span css={[description]}>MVPs</span>
      </div>
      <div css={[info]}>
        <span css={[value]}>
          <SkeletonWrapper width={infoWidth} height={infoHeight}>
            {() => (player ? player.games : 0)}
          </SkeletonWrapper>
        </span>
        <span css={[description]}>Games</span>
      </div>
      <a
        href={player ? `https://vgpro.gg/players/${player.name}` : `https://vgpro.gg`}
        target="_blank"
      >
        <button css={[moreButton]}>More on VGPRO.gg</button>
      </a>
    </div>
  );
};

export default Stats;
