import * as React from "react";
import { Query } from "react-apollo";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Records from "../components/Records";
import Layout, { Content, Sidebar } from "../components/common/Layout";
import { SkeletonContext } from "../components/common/Skeleton";
import Articles from "../components/Articles/Articles";
import Prizes from "../components/Prizes";
import Time from "../components/Time";
import BrokenMyth from "../components/Articles/BrokenMyth";

type Props = {
  query: Record<string, string | string[] | undefined>;
};
type State = {
  page: number;
};

const top = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

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
                <Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Sidebar>
                <Content>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* <Articles /> */}
                    <BrokenMyth />
                    <Prizes />
                    <Time />
                  </div>
                  <Records />
                </Content>
              </Layout>
            </SkeletonContext.Provider>
          );
        }}
      </Query>
    );
  }
}
