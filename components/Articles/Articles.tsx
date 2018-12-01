import * as React from "react";
import { css } from "emotion";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ArticleItem, { Article } from "./Article";
import Box from "../common/Box";

const container = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media screen and (max-width: 800px) {
    ${Box};
    overflow: hidden;
    flex-direction: column;
  }
`;

const GET_ARTICLES = gql`
  query Articles($page: Int!, $limit: Int!) {
    articles(page: $page, limit: $limit) {
      attributes {
        path
        title
        date
        image
      }
    }
  }
`;

class Articles extends React.Component<{}> {
  render() {
    return (
      <div className={container}>
        <Query query={GET_ARTICLES} variables={{ page: 0, limit: 3 }}>
          {({ data }) => {
            const articles: Array<Article> = data && data.articles ? data.articles : [];
            return articles.map(article => (
              <ArticleItem
                key={article.attributes.title + article.attributes.date}
                article={article}
              />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default Articles;
