import React from "react";
import { css } from "emotion";

import { Query } from "react-apollo";
import qRecord from "./../../graphql/record";

import Box from "./../common/Box";

const container = css`
  padding: 10px 10px 0;
  margin-bottom: 10px;
  border-top: 1px solid rgba(75, 75, 75, 0.1);
  &:first-of-type {
    border-top: 0;
  }
`;

const records = css`
  display: flex;
  ${Box};
  flex-direction: column;
  margin: 10px 5px;
`;

const name = css`
  font-size: 18px;
  font-family: "Roboto Condensed";
  font-weight: 700;

  display: flex;
  align-items: center;
  margin-left: 10px;
  & i {
    color: #eaa900;
    margin-right: 5px;
    font-size: 20px;
    margin-bottom: -3px;
  }
  & > span {
    margin-left: 3px;
    padding-top: 3px;
    font-size: 12px;
    color: rgba(100, 100, 100, 0.5);
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const points = css`
  font-size: 15px;
  margin-left: auto;
  text-align: center;
  & > div {
    font-size: 21px;
  }
  & > span {
    font-size: 13px;
    text-transform: uppercase;
  }
`;

const stats = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: #4a4a4a;
  & > div {
    padding: 0 10px;
    border-right: 2px solid rgba(100, 100, 100, 0.05);
    text-align: center;

    &:last-of-type {
      border: 0;
    }
    & div {
      font-family: "Roboto Condensed";
      font-size: 18px;
      font-weight: bold;
    }
    & span {
      margin-top: -5px;
      font-size: 9px;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`;

export default ({ type, title }) => (
  <div>
    <h4>{title}</h4>
    <div className={records}>
      <Query query={qRecord} variables={{ type, limit: 3 }}>
        {({ loading, error, data }) => {
          if (loading) return null;

          const key = Object.keys(data)[0];

          const players = data[key];

          return players.map(player => {
            let winRate = Math.floor((player.wins / player.games) * 100);
            return (
              <div className={container} key={player.id}>
                <div className={name}>
                  <i className={`vg-rank-${player.tier}`} />
                  {player.name}
                  <span>
                    {player.region === "sg" ? "sea" : player.region}
                  </span>
                  <div className={points}>
                    <div>{player.points}</div>
                    <span>Points</span>
                  </div>
                </div>
                <div className={stats}>
                  <div>
                    <div>{player.wins}</div>
                    <span>Wins</span>
                  </div>
                  <div>
                    <div>{player.games - player.wins}</div>
                    <span>Losses</span>
                  </div>
                  <div>
                    <div
                      style={{
                        color: winRate > 50 ? "#4A90E2" : "#D0021B"
                      }}
                    >
                      {winRate}%
                    </div>
                    <span>Win Rate</span>
                  </div>
                  <div>
                    <div>{player.games}</div>
                    <span>Games</span>
                  </div>
                  <div>
                    <div>{player.mvp}</div>
                    <span>MVPs</span>
                  </div>
                </div>
              </div>
            );
          });
        }}
      </Query>
    </div>
  </div>
);
