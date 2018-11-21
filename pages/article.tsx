import * as React from "react";
import { NextContext } from "next";
import FullArticle from "../components/Articles/FullArticle";
import Layout from "../components/common/Layout";
import { Query } from "react-apollo";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import { SkeletonContext } from "../components/common/Skeleton";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { withRouter } from "next/router";

type Props = {
  articlePath?: string;
  router: any;
};

type State = {
  page: number;
};

class ArticlePage extends React.Component<Props, State> {
  static async getInitialProps({ query }: NextContext) {
    const articlePath = query.path;
    return { articlePath };
  }

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
    const { articlePath } = this.props;
    if (typeof articlePath !== "string") {
      this.props.router.push("/");
    }
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
                <Layout.Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Layout.Sidebar>
                <Layout.Content>
                  <FullArticle articlePath={articlePath} />
                </Layout.Content>
              </Layout>
            </SkeletonContext.Provider>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ArticlePage);
