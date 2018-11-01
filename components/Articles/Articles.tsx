import * as React from "react";
import { css } from "emotion";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Box from "../common/Box";
import ArticleItem, { Article } from "./Article";

const container = css`
  //background-color: #7777ff;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
  & > .empty {
    ${Box};
    min-height: 250px;
  }
`;

const GET_ARTICLES = gql`
  {
    articles {
      title
      date
      image
      body
    }
  }
`;

const Articles: React.SFC = () => (
  <div className={container}>
    <Query query={GET_ARTICLES}>
      {({ data, loading, error }) => {
        // if (loading) return <div>Loading...</div>;
        // if (error) return <div>Error: {error.message}</div>;
        const articles: Array<Article> = data && data.articles ? data.articles : [];
        if (articles.length > 0) {
          return articles.map(article => (
            <ArticleItem key={article.title + article.date} article={article} />
          ));
        }
        return (
          <>
            <div className="empty" />
            <div className="empty" />
            <div className="empty" />
            <div className="empty" />
          </>
        );
      }}
    </Query>
  </div>
);

export default Articles;
