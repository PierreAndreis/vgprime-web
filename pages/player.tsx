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
import Articles from "../components/Articles/Articles";

const playerInfo = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
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
              <Layout>
                <Layout.Section area="sidebar" tabContent={
                  <>
                  <i>L</i>
                  <span>Leaderboard</span>
                  </>
                }>
                  <h4>Leaderboard</h4>
                  <Leaderboard players={players} playerName={playerName} />
                </Layout.Section>
                <Layout.Section area="main" tabContent={
                  <>
                    <i>A</i>
                    <span>Articles</span>
                  </>
                }>
                  <Articles/>
                </Layout.Section>
                <Layout.Section area="content" tabContent={
                  <>
                    <i>S</i>
                    <span>Stats</span>
                  </>
                }>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search />
                  </div>
                  <div className={playerInfo}>
                    <PlayerInfo player={player} />
                  </div>
                </Layout.Section>
                </Layout>
              </SkeletonContext.Provider>
            );
          }}
        </Query>
    );
  }
}

export default PlayerPage;
