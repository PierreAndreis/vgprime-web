import * as React from "react";
import { Query } from "react-apollo";
import { NextContext } from "next";
import { css } from "emotion";
import Leaderboard from "./../components/Leaderboard/Leaderboard";
import Prizes from "./../components/Prizes";
import ErrorMessage from "./../components/common/ErrorMessage";
import Search from '../components/Search';
import PlayerInfo from '../components/Player/Player';
import { byPlayerName as qLeaderboard } from './../graphql/leaderboard';
import { PlayersList } from '../graphql/leaderboard'
import { SkeletonContext } from "../components/common/Skeleton";
import Router from 'next/router'

const container = css`
  width: auto;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  display: grid;
  grid-template:
    "header header" auto
    "prizes sidebar" auto
    "content sidebar" 1fr
    / 1fr 360px;
  grid-column-gap: 10px;

  & h4 {
    font-size: 17px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 1300px) {
    grid-template:
      "header header" auto
      "sidebar prizes" auto
      "sidebar content" auto
      / 360px 1fr;
  }

  @media screen and (max-width: 800px) {
    width: 380px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const header = css`
  grid-area: header;
  order: 0;

  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 2%;
`;

const logo = css`
  width: 180px;
  height: 60px;

  background: url("/static/images/logo.png") no-repeat;
  background-size: contain;

  color: #7aaeff;
  font-weight: bold;
  font-size: 35px;

  & > b {
    color: black;
  }
`;

const sidebar = css`
  grid-area: sidebar;
  order: 2;
  animation: fadeIn 1s ease
`;

const prizes = css`
  grid-area: prizes;
  position: relative;
  order: 1;
`;

const content = css`
  grid-area: content;
  order: 3;
`;

const playerInfo = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeIn 1s ease
`;

const searchArea = css`
  width: 330px;
  box-sizing: border-box;
  margin: 15px auto 30px;
`;

type Props = {
  playerName: string
}

class PlayerPage extends React.Component<Props> {
  static async getInitialProps({ query }: NextContext) {
    return { playerName: query.name };
  }
  render() {
    return (
      <div className={container}>
        <div className={header}>
          <div className={logo} />
        </div>
        <Query
          query={qLeaderboard}
          variables={{ playerName: this.props.playerName }} >
          {({ error, data, loading }) => {
            console.log('actual data', data);
            if (error) {
              return <ErrorMessage message={error.message} />;
            }

            const players = data.leaderboard ? data.leaderboard as PlayersList : [] as PlayersList;
            const player = players.find((p) => p.name === this.props.playerName);
            if (!loading && !player) {
              Router.push({pathname: '/', query: {error: 'PlayerNotFound', payload: this.props.playerName}});
            }
            return (
              <SkeletonContext.Provider value={loading ? 'loading' : 'loaded'}>
                <div className={sidebar}>
                  <h4>Leaderboard</h4>
                  <Leaderboard players={players} playerName={this.props.playerName} />
                </div>
                <div className={content}>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search defaultValue={this.props.playerName}/>
                  </div>
                  <div className={playerInfo}>
                    
                    {
                      loading ? <div>Loading...</div> :
                      players.length > 0 && player
                        ? <PlayerInfo player={player}/>
                        : <div>{this.props.playerName} does not exists!</div>
                    }
                  </div>
                </div>
              </SkeletonContext.Provider>
            )
          }}
        </Query>
        <div className={prizes}>
          <h4>Prizes</h4>
          <Prizes />
        </div>
      </div>
    );
  }
}

// Player.propTypes = {
//   playerName: PropTypes.string.isRequired
// }

export default PlayerPage;