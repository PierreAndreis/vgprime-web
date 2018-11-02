import * as React from "react";
import { NextContext } from "next";
import FullArticle from "../components/Articles/FullArticle";
import Router from "next/router";

type Props = {
  articlePath?: string;
};

class ArticlePage extends React.Component<Props> {
  static async getInitialProps({ query, res }: NextContext) {
    const articlePath = query.path;
    // if (!articlePath) {
    //   if (res) {
    //     res.writeHead(302, {
    //       Location: "/",
    //     });
    //     res.end();
    //   } else {
    //     Router.push("/");
    //   }
    // }
    return { articlePath };
  }

  render() {
    const { articlePath } = this.props;
    if (!articlePath) {
      return <div>Damn... 'articlePath' can't be null!</div>;
    }
    return <FullArticle articlePath={articlePath} />;
  }
}

export default ArticlePage;
