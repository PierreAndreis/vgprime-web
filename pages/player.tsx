import * as React from "react";
import { NextContext } from "next";
import Layout, { Content, Sidebar } from "./../components/common/Layout";
import ErrorMessage from "./../components/common/ErrorMessage";
import PlayerInfo from "../components/Player/Player";
import Head from "next/head";
import LeaderboardContainer from "../components/Leaderboard/LeaderboardContainer";

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
        <Layout>
          <Sidebar>
            <LeaderboardContainer playerName={playerName} />
          </Sidebar>
          <Content>
            <PlayerInfo playerName={playerName} />
          </Content>
        </Layout>
      </>
    );
  }
}

export default PlayerPage;
