import * as React from "react";
import { css } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/leaderboard";

import boxCss from "./../common/Box";
import { getTopHeroesByPlayerName } from "../../api/vgpro";
import { buttonCss } from "../common/Button";

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
    color: #91dde9;
    font-weight: 600;
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
  background-image: linear-gradient(to right, #79affe, #74dfeb);
  position: absolute;
  bottom: -15px;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  text-transform: none;
`;

export type PlayerInfoProps = {
  player?: Player;
};
export type PlayerInfoState = {
  topHeroes: any[];
};

class PlayerInfo extends React.Component<PlayerInfoProps, PlayerInfoState> {
  defaultTopHeroes: any[];

  constructor(props: PlayerInfoProps) {
    super(props);
    this.defaultTopHeroes = [
      { name: "" },
      { name: "" },
      { name: "" },
      { name: "" },
      { name: "" },
    ];
    this.state = {
      topHeroes: this.defaultTopHeroes,
    };
  }

  componentWillReceiveProps() {
    const player = this.props.player;
    this.setState({ topHeroes: this.defaultTopHeroes });
    if (player === undefined) return null;
    getTopHeroesByPlayerName(player.name)
      .then(heroes => {
        this.setState({ topHeroes: heroes });
      })
      .catch(() => {
        this.setState({ topHeroes: [] });
      });
  }

  gotoVgPro = () => {
    if (this.props.player) {
      window.open(`https://vgpro.gg/players/${this.props.player.name}`);
    }
  };

  render() {
    const player = this.props.player;
    if (player === undefined) return null;
    console.log("topHeroes = ", this.state.topHeroes);
    const topHeroes = this.state.topHeroes.map((h, k) => {
      return <div key={k} className={heroe(h.name)} title={h.name} />;
    });
    if (this.state.topHeroes.length < 5) {
      const remaining = [];
      for (let i = this.state.topHeroes.length; i < 5; i++) {
        remaining.push({ name: "" });
      }
      this.setState({ topHeroes: [...this.state.topHeroes, ...remaining] });
    }

    return (
      <div className={container}>
        <div className={info}>
          <i className={`vg-rank-${player.tier}`} />
          <span>
            <SkeletonWrapper>{() => player.name}</SkeletonWrapper>
          </span>
          <span>
            <SkeletonWrapper>
              {() => (player.region === "sg" ? "sea" : player.region)}
            </SkeletonWrapper>
          </span>
          <span>
            <SkeletonWrapper>{() => player.points + " PTS"}</SkeletonWrapper>
          </span>
        </div>
        <div className={separator} />
        <div className={heroes}>
          <span>TOP 5 HEROES</span>
          {topHeroes}
        </div>
        <button className={moreButton} onClick={this.gotoVgPro}>
          More on VGPRO
        </button>
      </div>
    );
  }
}

export default PlayerInfo;
