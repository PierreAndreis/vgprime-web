import React from "react";
import { css } from "emotion";
import { Query } from "react-apollo";
import Link from "next/link";

import qRecord from "../../graphql/record";
import { Record } from "../../graphql/record";

import Box from "./../common/Box";
import { SkeletonContext, SkeletonWrapper } from "../common/Skeleton";

const container = css`
  display: block;
  color: inherit;
  padding: 10px 8px 0;
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
  background-color: #4a90e2;
  border-radius: 15px;
  color: #fff;
  padding: 4px 8px 4px 8px;
  & > div {
    font-size: 21px;
  }
  & > span {
    font-size: 13px;
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

const RECORD_PLAYERS_COUNT = 3;

type Props = {
  type: string;
  title: string;
};

type RecordItem = {
  available: boolean;
  player: Record;
};

const RecordBox: React.SFC<Props> = ({ type, title }) => (
  <div>
    <h4>{title}</h4>
    <div className={records}>
      <Query query={qRecord} variables={{ type, limit: 3 }}>
        {({ loading, data, error }) => {
          let players: Array<RecordItem> = [];

          if (!loading && !error && data.record) {
            for (let p of data.record) {
              players.push({ player: p, available: true });
            }
          }

          while (players.length < RECORD_PLAYERS_COUNT) {
            players.push({ player: {} as Record, available: false });
          }

          return players.map(({ player, available }, k) => {
            let winRate = Math.floor((player.wins / player.games) * 100);
            return (
              <SkeletonContext.Provider
                key={`${title}player${k}`}
                value={loading || error || !available ? "loading" : "loaded"}
              >
                <Link href={available ? `/player?name=${player.name}` : "#"} prefetch>
                  <a className={container}>
                    <div className={name}>
                      <SkeletonWrapper width={20} height={23}>
                        {() => <i className={`vg-rank-${player.tier}`} />}
                      </SkeletonWrapper>
                      <SkeletonWrapper>{() => player.name}</SkeletonWrapper>
                      <span>
                        <SkeletonWrapper width={20} height={15}>
                          {() => (player.region === "sg" ? "sea" : player.region)}
                        </SkeletonWrapper>
                      </span>
                      <div className={points}>
                        <span>
                          <SkeletonWrapper width={40} height={10}>
                            {() => `${player.points} Pts`}
                          </SkeletonWrapper>
                        </span>
                      </div>
                    </div>
                    <div className={stats}>
                      <div>
                        <div>
                          <SkeletonWrapper width={22} height={18}>
                            {() => player.wins}
                          </SkeletonWrapper>
                        </div>
                        <span>Wins</span>
                      </div>
                      <div>
                        <div>
                          <SkeletonWrapper width={32} height={18}>
                            {() => player.games - player.wins}
                          </SkeletonWrapper>
                        </div>
                        <span>Losses</span>
                      </div>
                      <div>
                        <div
                          style={{
                            color: winRate > 50 ? "#4A90E2" : "#D0021B",
                          }}
                        >
                          <SkeletonWrapper width={40} height={18}>
                            {() => `${winRate}%`}
                          </SkeletonWrapper>
                        </div>
                        <span>Win Rate</span>
                      </div>
                      <div>
                        <div>
                          <SkeletonWrapper width={30} height={18}>
                            {() => player.games}
                          </SkeletonWrapper>
                        </div>
                        <span>Games</span>
                      </div>
                      <div>
                        <div>
                          <SkeletonWrapper width={25} height={18}>
                            {() => player.mvp}
                          </SkeletonWrapper>
                        </div>
                        <span>MVPs</span>
                      </div>
                    </div>
                  </a>
                </Link>
              </SkeletonContext.Provider>
            );
          });
        }}
      </Query>
    </div>
  </div>
);

export default RecordBox;
