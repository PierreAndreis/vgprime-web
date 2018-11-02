import * as React from "react";
import { css } from "emotion";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Box from "../common/Box";
import ArticleItem, { Article } from "./Article";
import { buttonCss } from "../common/Button";

const container = css`
  & > .articles {
    display: flex;
    & > .empty {
      ${Box};
      min-height: 250px;
    }
  }
  & > .nav-buttons {
    display: flex;
    justify-content: space-between;
    button {
      ${buttonCss};
    }
  }
`;

const GET_ARTICLES = gql`
  query Articles($page: Int!, $limit: Int!) {
    articles(page: $page, limit: $limit) {
      path
      title
      date
      image
      body
    }
  }
`;

type Props = {};

type State = {
  page: number;
};

class Articles extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  incPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  decPage = () => {
    this.setState(({ page }) => ({ page: page - 1 }));
  };

  render() {
    const { page } = this.state;
    return (
      <div className={container}>
        <Query query={GET_ARTICLES} variables={{ page, limit: 4 }}>
          {({ data }) => {
            const articles: Array<Article> = data && data.articles ? data.articles : [];
            return (
              <div className="articles">
                {articles.map(article => (
                  <ArticleItem key={article.title + article.date} article={article} />
                ))}
              </div>
            );
          }}
        </Query>
        <div className="nav-buttons">
          <button onClick={this.decPage} disabled={page === 0}>
            Newer
          </button>
          <button onClick={this.incPage}>Older</button>
        </div>
      </div>
    );
  }
}

export default Articles;
