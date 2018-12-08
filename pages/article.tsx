import * as React from "react";
import { NextContext } from "next";
import FullArticle from "../components/Articles/FullArticle";
import Layout, { Sidebar, Content } from "../components/common/Layout";
import { withRouter } from "next/router";
import LeaderboardContainer from "../components/Leaderboard/LeaderboardContainer";

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
      <Layout>
        <Sidebar>
          <LeaderboardContainer />
        </Sidebar>
        <Content>
          <FullArticle articlePath={articlePath} />
        </Content>
      </Layout>
    );
  }
}

export default withRouter(ArticlePage);
