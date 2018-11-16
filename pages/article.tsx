import * as React from "react";
import { NextContext } from "next";
import FullArticle from "../components/Articles/FullArticle";
import Layout from "../components/common/Layout";
import { Query } from "react-apollo";
import { byPage as qLeaderboard, PlayersList } from "../graphql/leaderboard";
import { SkeletonContext } from "../components/common/Skeleton";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Articles from "../components/Articles/Articles";
import { withRouter } from "next/router";

type Props = {
  articlePath?: string;
  router: any;
};

type State = {
  page: number;
};

class ArticlePage extends React.Component<Props, State> {
  static async getInitialProps({ query, res }: NextContext) {
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
    if (!articlePath) {
      this.props.router.push('/');
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
                <Layout.Section area="sidebar" tabContent={
                  <>
                    <i>L</i>
                    <span>Leaderboard</span>
                  </>
                }>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
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
                    <i>A</i>
                    <span>Article</span>
                  </>
                }>
                  <FullArticle articlePath={articlePath} />
                </Layout.Section>
                </Layout>
              </SkeletonContext.Provider>
            );
          }}
        </Query>
    );
  }
}

export default withRouter(ArticlePage);
