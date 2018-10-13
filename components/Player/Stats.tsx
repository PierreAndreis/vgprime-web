import * as React from 'react';
import { Player } from 'graphql/leaderboard';
import { css } from 'emotion';
import boxCss from "./../common/Box";

const container = css`
  ${boxCss};
  magin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
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
  color: 
  text-transform: uppercase;
`;

type Props = {
  player: Player;
}

const Stats = ({player}: Props) => {
  return (
    <div className={container}>
      <div className={info}>
        <span className={value}>{player.wins}</span>
        <span className={description}>Wins</span>
      </div>
      <div className={info}>
        <span className={value}>{player.games - player.wins}</span>
        <span className={description}>Losses</span>
      </div>
      <div className={info}>
        <span className={value}>{player.mvp}</span>
        <span className={description}>MVPs</span>
      </div>
      <div className={info}>
        <span className={value}>{player.games}</span>
        <span className={description}>Games</span>
      </div>
    </div>
  )
};

export default Stats;