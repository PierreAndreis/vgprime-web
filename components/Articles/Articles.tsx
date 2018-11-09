import * as React from "react";
import { css } from "emotion";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ArticleItem, { Article } from "./Article";

const container = css`
  & > .articles {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    & > div {
      box-sizing: border-box;
      width: calc(100% / 3 - 20px);
      @media screen and (max-width: 1300px) {
        width: calc(100% / 2 - 20px);
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
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
        <Query query={GET_ARTICLES} variables={{ page, limit: 3 }}>
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
      </div>
    );
  }
}

export default Articles;
