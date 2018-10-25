import * as React from "react";
import { Query, WithApolloClient, withApollo, ApolloConsumer } from "react-apollo";
import { NextContext } from "next";
import { css } from "emotion";
import Layout from "./../components/common/Layout";
import Leaderboard from "./../components/Leaderboard/Leaderboard";

import ErrorMessage from "./../components/common/ErrorMessage";
import Search from "../components/Search";
import PlayerInfo from "../components/Player/Player";

// import Search from "components/Search";
import { byPlayerName as qLeaderboard, Player } from "./../graphql/leaderboard";
import { PlayersList } from "../graphql/leaderboard";
import { SkeletonContext } from "../components/common/Skeleton";
import Router from "next/router";
import { gql, ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { getTopHeroesByPlayerName } from "../api/vgpro";
import { HeroesStats } from "../api/types";
import { FadeLoader as LoadingIcon } from "react-spinners";

const GET_PLAYER = gql`
  query getPlayer($name: String!) {
    player(name: $name) {
      id
      name
    }
  }
`;

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
  static async getInitialProps({ query, res }: NextContext) {
    const redirectToIndex = () => {
      if (res) {
        res.writeHead(302, { Location: "/" });
        res.end();
      } else if (typeof document !== "undefined") {
        Router.push("/");
      }
      return {};
    };
    const playerName = query.name as string;

    if (!playerName || playerName === "") {
      return redirectToIndex();
    }
    /*
    const restLink = new HttpLink({
      uri: apiUrl, // Server URL (must be absolute)
      credentials: "same-origin",
    });

    const client = new ApolloClient({
      link: restLink,
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: GET_PLAYER,
      variables: { name: playerName },
    });

    if (!data || !(data as any).player) {
      return redirectToIndex();
    }

    const player = (data as any).player as Player;

    const topHeroes = await getTopHeroesByPlayerName(playerName); */

    return { playerName };
  }

  render() {
    const { playerName } = this.props;
    return (
      <Layout>
        <Query query={qLeaderboard} variables={{ playerName }}>
          {({ error, data, loading }) => {
            if (error) {
              console.log("error while fetching data", error);
              return <ErrorMessage message={error.message} />;
            }

            let players: PlayersList = [];
            let player: Player = { name: "" } as Player;
            if (data.leaderboard) {
              players = data.leaderboard;
              player = players.find(p => p.name === playerName) as Player;
            }
            return (
              <SkeletonContext.Provider value={loading ? "loading" : "loaded"}>
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
                    {player.name && player.name !== "" ? (
                      <PlayerInfo player={player} />
                    ) : (
                      <LoadingIcon loading={true} />
                    )}
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
