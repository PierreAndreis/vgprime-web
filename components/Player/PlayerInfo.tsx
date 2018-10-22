import * as React from "react";
import { css } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/leaderboard";

import boxCss from "./../common/Box";

import { buttonCss } from "../common/Button";
import { HeroesStats } from "../../api/types";
import { Query } from "react-apollo";
import getHeroes from "../../graphql/getHeroes";

const container = css`
  ${boxCss};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
`;

const info = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
  width: calc(100% - 30px);
  box-sizing: border-box;
  & i {
    color: #eaa900;
    font-size: 32px;
  }
  & > span:nth-of-type(1) {
    margin-left: 10px;
    color: #71bbc9;
    font-family: "Roboto Condensed";
    font-weight: 700;
  }
  & > span:nth-of-type(2) {
    margin-left: 10px;
    padding-top: 1px;
    font-size: 14px;
    color: rgba(20, 20, 20, 0.7);
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 20px;
  }
  & > span:nth-of-type(3) {
    padding: 10px 20px 10px 20px;
    background-color: #dcdcdc;
    border-radius: 15px;
    margin-left: auto;
    justify-self: flex-end;
    font-size: 14px;
    color: rgba(20, 20, 20, 0.7);
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const separator = css`
  height: 1px;
  width: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const heroes = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
  margin-bottom: 30px;
  & > span {
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
  }
`;
const heroeImageSize = "35px";
// const emptyHeroe = css`
//   background-color: #dcdcdc;
// `;
const heroe = (heroName: string) => css`
  ${!heroName || heroName === ""
    ? "background-color: #dcdcdc"
    : `background-image: 
    url("https://vgproassets.nyc3.cdn.digitaloceanspaces.com/heroes/${heroName.toLowerCase()}.png")`};
  background-size: ${heroeImageSize} ${heroeImageSize};
  width: ${heroeImageSize};
  height: ${heroeImageSize};
  border-radius: ${heroeImageSize};
  margin-right: 5px;
`;

const moreButton = css`
  ${buttonCss};
  position: absolute;
  bottom: -15px;
  padding: 10px 25px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  text-transform: none;
`;

export type PlayerInfoProps = {
  player: Player;
};

class PlayerInfo extends React.Component<PlayerInfoProps> {
  constructor(props: PlayerInfoProps) {
    super(props);
  }

  gotoVgPro = () => {
    if (this.props.player) {
      window.open(`https://vgpro.gg/players/${this.props.player.name}`);
    }
  };

  render() {
    const { player } = this.props;
    // const topHeroesRenderer = topHeroes.map((h, k) => {
    //   return <div key={k} className={heroe(h.name)} title={h.name} />;
    // });

    return (
      <div className={container}>
        <div className={info}>
          <SkeletonWrapper>
            {() => <i className={`vg-rank-${player.tier}`} />}
          </SkeletonWrapper>
          <span>
            <SkeletonWrapper>{() => player.name}</SkeletonWrapper>
          </span>
          <span>
            <SkeletonWrapper>
              {() => (player.region === "sg" ? "sea" : player.region)}
            </SkeletonWrapper>
          </span>

          <SkeletonWrapper height={30}>
            {() => <span>{player.points + " PTS"}</span>}
          </SkeletonWrapper>
        </div>
        <div className={separator} />
        <div className={heroes}>
          <span>TOP 5 HEROES</span>
          <Query query={getHeroes} variables={{ playerName: player.name }}>
            {({ error, data, loading }) => {
              const heroesAmount = 5;
              const topHeroes = [] as HeroesStats[];
              while (topHeroes.length < heroesAmount) {
                topHeroes.push({ name: "" } as HeroesStats);
              }
              if (
                !error &&
                !loading &&
                data &&
                data.getHeroes &&
                data.getHeroes.stats &&
                data.getHeroes.stats.Heroes
              ) {
                const heroes = data.getHeroes.stats.Heroes.slice() as HeroesStats[];
                heroes.sort((h1, h2) => h2.games - h1.games);
                const topHeroesReceived =
                  heroes.length > heroesAmount ? heroes.slice(0, heroesAmount) : heroes;
                for (let i = 0; i < topHeroes.length; i++) {
                  topHeroes[i] = topHeroesReceived[i];
                }
              }
              return topHeroes.map((h, k) => (
                <div key={`topHeroe${k}`} className={heroe(h.name)} />
              ));
            }}
          </Query>
        </div>
        <button className={moreButton} onClick={this.gotoVgPro}>
          More on VGPRO
        </button>
      </div>
    );
  }
}

export default PlayerInfo;
