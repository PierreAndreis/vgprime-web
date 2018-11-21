import * as React from "react";
import { css } from "emotion";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ArticleItem, { Article } from "./Article";

const container = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
            return articles.map((article, key) => (
              <ArticleItem key={article.title + article.date} article={article} />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default Articles;
