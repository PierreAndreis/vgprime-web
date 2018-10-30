import * as React from "react";
import { Query } from "react-apollo";
import { NextContext } from "next";
import { css } from "emotion";
import Layout from "./../components/common/Layout";
import Leaderboard from "./../components/Leaderboard/Leaderboard";
import ErrorMessage from "./../components/common/ErrorMessage";
import Search from "../components/Search";
import PlayerInfo from "../components/Player/Player";
import { byPlayerName as qLeaderboard, Player } from "./../graphql/leaderboard";
import { PlayersList } from "../graphql/leaderboard";
import { SkeletonContext } from "../components/common/Skeleton";
import { FadeLoader as LoadingIcon } from "react-spinners";

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
  playerName: string | null;
};

class PlayerPage extends React.Component<Props> {
  static async getInitialProps({ query }: NextContext) {
    const playerName = query.name;
    return { playerName };
  }

  render() {
    const { playerName } = this.props;
    if (!playerName) {
      return (
        <Layout>
          <ErrorMessage message="You need to provide a player name" />
        </Layout>
      );
    }

    return (
      <Layout>
        <Query query={qLeaderboard} variables={{ playerName }}>
          {({ error, data, loading }) => {
            // if (error) {
            //   return <ErrorMessage message={error.message} />;
            // }
            let players: PlayersList = [];
            let player: Player | undefined;
            if (data && data.leaderboard) {
              players = data.leaderboard;
              player = players.find(p => p.name === playerName) as Player;
            }
            return (
              <SkeletonContext.Provider
                value={loading || error || !player ? "loading" : "loaded"}
              >
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard players={players} playerName={playerName} />
                </Layout.Sidebar>
                <Layout.Content>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search />
                  </div>
                  <div className={playerInfo}>
                    {!player ? <PlayerInfo player={player} /> : <LoadingIcon />}
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

export default PlayerPage;
