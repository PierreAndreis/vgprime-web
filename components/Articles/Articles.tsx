import * as React from "react";
import { css } from "emotion";
import Article from "./Article";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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
`;

const GET_ARTICLES = gql`
  {
    articles
  }
`;

const Articles: React.SFC = () => (
  <div className={container}>
    <Query query={GET_ARTICLES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        const articles: Array<string> = data && data.articles ? data.articles : [];
        return articles.map(article => <Article content={article} />);
      }}
    </Query>
  </div>
);

export default Articles;
