import * as React from "react";
import { Query } from "react-apollo";
import { NextContext } from "next";
import Layout, { Content, Sidebar } from "./../components/common/Layout";
import Leaderboard from "./../components/Leaderboard/Leaderboard";
import ErrorMessage from "./../components/common/ErrorMessage";
import PlayerInfo from "../components/Player/Player";
import { byPlayerName as qLeaderboard, Player } from "./../graphql/leaderboard";
import { PlayersList } from "../graphql/leaderboard";
import { SkeletonContext } from "../components/common/Skeleton";
import Head from "next/head";

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
      <>
        <Head>
          <title>{playerName} - VGPRIME</title>
        </Head>
        <Query query={qLeaderboard()} variables={{ playerName }}>
          {({ error, data, loading }) => {
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
                <Layout>
                  <Sidebar>
                    <h4>Leaderboard</h4>
                    <Leaderboard players={players} playerName={playerName} />
                  </Sidebar>
                  <Content>
                    <PlayerInfo player={player} />
                  </Content>
                </Layout>
              </SkeletonContext.Provider>
            );
          }}
        </Query>
      </>
    );
  }
}

export default PlayerPage;
