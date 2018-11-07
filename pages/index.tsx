import * as React from "react";
import { Query } from "react-apollo";
import { css } from "emotion";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Records from "../components/Records";
import Search from "../components/Search";
import Layout from "../components/common/Layout";
import { SkeletonContext } from "../components/common/Skeleton";
import { NextContext } from "next";
import Articles from "../components/Articles/Articles";

const records = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const articles = css``;

const searchArea = css`
  width: 330px;
  box-sizing: border-box;
  margin: 15px auto 30px;
`;

type Props = {
  query: Record<string, string | string[] | undefined>;
};

type State = {
  page: number;
};

export default class Home extends React.Component<Props, State> {
  state = {
    page: 0,
  };

  next = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  previous = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };
  render() {
    return (
      <Layout>
        <Query query={qLeaderboard} variables={{ page: this.state.page }}>
          {({ error, data, loading }) => {
            let players: PlayersList =
              data && data.leaderboard && data.leaderboard.length > 0
                ? data.leaderboard
                : [];

            return (
              <SkeletonContext.Provider
                value={loading || error || players.length === 0 ? "loading" : "loaded"}
              >
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Layout.Sidebar>
                <Layout.Content>
                  <div className={articles}>
                    <h4>Articles</h4>
                    <Articles />
                  </div>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search />
                  </div>
                  <div className={records}>
                    <Records />
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
