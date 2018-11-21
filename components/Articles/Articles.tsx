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

  @media screen and (max-width: 500px) {
    flex-direction: column;
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

class Articles extends React.Component<Props> {
  render() {
    return (
      <div className={container}>
        <Query query={GET_ARTICLES} variables={{ page: 1, limit: 3 }}>
          {({ data }) => {
            const articles: Array<Article> = data && data.articles ? data.articles : [];
            return articles.map(article => (
              <ArticleItem key={article.title + article.date} article={article} />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default Articles;
