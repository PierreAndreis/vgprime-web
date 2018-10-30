import * as React from "react";
import { Query } from "react-apollo";
import { css, keyframes } from "emotion";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import ErrorMessage from "../components/common/ErrorMessage";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Records from "../components/Records";
import Search from "../components/Search";
import Layout from "../components/common/Layout";
import { SkeletonContext } from "../components/common/Skeleton";

// @ts-ignore
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const records = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const transitionTimeMs = 300;

const searchArea = css`
  width: 330px;
  box-sizing: border-box;
  margin: 15px auto 30px;
`;

type State = {
  page: number;
  exiting: boolean;
};

export default class Home extends React.Component<{}, State> {
  state = {
    page: 0,
    exiting: false,
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
            // If errored
            if (!loading && error) return <ErrorMessage message={error.message} />;
            // If empty data
            if (!data.leaderboard || data.leaderboard.length === 0) {
              return <ErrorMessage message="No data fetched" />;
            }
            const players = data.leaderboard as PlayersList;
            return (
              <SkeletonContext.Provider value={loading ? "loading" : "loaded"}>
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Layout.Sidebar>
                <Layout.Content>
                  <div className={searchArea}>
                    <h4>Search a Player</h4>
                    <Search
                      beforeSearch={() => {
                        this.state.exiting = true;
                        this.forceUpdate();
                      }}
                      timeout={transitionTimeMs / 2}
                    />
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
