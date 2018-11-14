import * as React from "react";
import { Query } from "react-apollo";
import { css } from "emotion";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Records from "../components/Records";
import Search from "../components/Search";
import Layout from "../components/common/Layout";
import { SkeletonContext } from "../components/common/Skeleton";
import Articles from "../components/Articles/Articles";

const records = css`
  //grid-area: content;
  //order: 3;
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
              <Layout>
                <Layout.Section
                  area="sidebar"
                  tabContent={
                    <>
                      <i>L</i>
                      <span>Leaderboard</span>
                    </>
                  }
                >
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Layout.Section>
                <Layout.Section
                  area="main"
                  tabContent={
                    <>
                      <i>A</i>
                      <span>Articles</span>
                    </>
                  }
                >
                  <Articles />
                </Layout.Section>
                <Layout.Section
                  area="content"
                  tabContent={
                    <>
                      <i>R</i>
                      <span>Records</span>
                    </>
                  }
                >
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search />
                  </div>
                  <div className={records}>
                    <Records />
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
