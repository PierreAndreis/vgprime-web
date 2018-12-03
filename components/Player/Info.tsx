import * as React from "react";
import { css } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/leaderboard";

import boxCss from "../common/Box";

import { PlayerStats } from "../../api/types";
import { Query } from "react-apollo";
import qPlayerStats from "../../graphql/playerStats";
import Link from "next/link";

const heroImage = (heroName: string): string =>
  `https://vgproassets.nyc3.cdn.digitaloceanspaces.com/heroes/${heroName.toLowerCase()}.png`;

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
const heroeImageSize = "40px";

const heroAvatar = css`
  background-color: #dcdcdc;
  background-size: ${heroeImageSize} ${heroeImageSize};
  width: ${heroeImageSize};
  height: ${heroeImageSize};
  border-radius: ${heroeImageSize};
  margin-right: 5px;
`;

export type PlayerInfoProps = {
  player?: Player;
};

class PlayerInfo extends React.Component<PlayerInfoProps> {
  render() {
    const { player } = this.props;

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
          <Query
            query={qPlayerStats}
            variables={{ playerName: player ? player.name : "IDontExist" }}
          >
            {({ error, data, loading }) => {
              let heroes: ReadonlyArray<string> = [];

              if (
                !loading &&
                !error &&
                data.playerStats &&
                data.playerStats.stats &&
                data.playerStats.stats.Heroes
              ) {
                const player = data.playerStats as PlayerStats;

                heroes = [...player.stats.Heroes]
                  .sort((a, b) =>
                    a.games !== b.games ? (a.games > b.games ? -1 : 1) : 0
                  )
                  .map(hero => hero.name);
              }

              const res: React.ReactNode[] = [];

              for (let i = 0; i < 5; i++) {
                let style;
                let heroLink = "";
                if (heroes[i]) {
                  heroLink = `https://vgpro.gg/heroes/${heroes[i]}`;
                  style = {
                    backgroundImage: `url(${heroImage(heroes[i])}`,
                  };
                }

                res.push(
                  <Link href={heroLink}>
                    <a target="_blank">
                      <div key={`topHero-${i}`} className={heroAvatar} style={style} />
                    </a>
                  </Link>
                );
              }
              return res;
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default PlayerInfo;
