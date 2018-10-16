import * as React from "react";
import { Query } from "react-apollo";
import { NextContext } from "next";
import { css } from "emotion";
import Layout from "./../components/common/Layout";
import Leaderboard from "./../components/Leaderboard/Leaderboard";

import ErrorMessage from "./../components/common/ErrorMessage";
import Search from "../components/Search";
import PlayerInfo from "../components/Player/Player";

// import Search from "components/Search";
import { byPlayerName as qLeaderboard } from "./../graphql/leaderboard";
import { PlayersList } from "../graphql/leaderboard";
import { SkeletonContext } from "../components/common/Skeleton";

const playerInfo = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const searchArea = css`
  width: 330px;
  box-sizing: border-box;
  margin: 15px auto 30px;
`;

type Props = {
  playerName: string;
};

class PlayerPage extends React.Component<Props> {
  static async getInitialProps({ query }: NextContext) {
    return { playerName: query.name };
  }

  render() {
    return (
      <Layout>
        <Query
          query={qLeaderboard}
          variables={{ playerName: this.props.playerName }}
        >
          {({ error, data, loading }) => {
            if (error) {
              console.log("error while fetching data", error);
              return <ErrorMessage message={error.message} />;
            }

            let players: PlayersList = [];
            let playerName = this.props.playerName;

            let player;

            if (data.leaderboard) {
              players = data.leaderboard;
              player = (data.leaderboard as PlayersList).find(
                p => p.name === playerName
              );
            }

            return (
              <SkeletonContext.Provider
                value={loading ? "loading" : "loaded"}
              >
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard players={players} playerName={playerName} />
                </Layout.Sidebar>
                <Layout.Content>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search placeholder={playerName} />
                  </div>
                  <div className={playerInfo}>
                    <PlayerInfo player={player} />
                  </div>
                </Layout.Content>
              </SkeletonContext.Provider>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

// Player.propTypes = {
//   playerName: PropTypes.string.isRequired
// }

export default PlayerPage;
