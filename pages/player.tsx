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

const playerInfo = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeIn 1s ease;
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

            if (!data.leaderboard) {
              console.log("invalid data on player:", data);
              console.log("actual playerName:", this.props.playerName);
              return <ErrorMessage message="No data fetched" />;
            }
            const players = data.leaderboard as PlayersList;
            const player = players.find(
              x => x.name === this.props.playerName
            );
            const playerFound = player !== undefined;

            return (
              <>
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    loading={loading}
                    playerName={this.props.playerName}
                  />
                </Layout.Sidebar>
                <Layout.Content>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search
                      placeholder={
                        playerFound ? this.props.playerName : ""
                      }
                    />
                  </div>
                  <div className={playerInfo}>
                    {player !== undefined ? (
                      <PlayerInfo player={player} />
                    ) : (
                      <div>{this.props.playerName} não existe!</div>
                    )}
                  </div>
                </Layout.Content>
              </>
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
