import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { css } from "emotion";
import ReactMarkdown from "react-markdown";
import { withRouter } from "next/router";
import contentStyle from "./ContentStyle";
import { FadeLoader } from "react-spinners";

// plz move this elsewhere
const GET_ARTICLE = gql`
  query Article($path: String!) {
    article(path: $path) {
      title
      date
      image
      body
    }
  }
`;

const container = css`
  ${contentStyle};
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  & > .image > img {
    width: 100%;
    object-fit: cover;
    object-position: 100% 0;
    @media screen and (max-width: 1200px) {
      height: 200px;
    }
    @media screen and (max-width: 800px) {
      height: 300px;
    }
  }
  & h1.title {
    font-size: 2.5rem;
    text-align: center;
    margin: 10px 0px;
  }
  & > .date {
    text-align: center;
  }
  & > .body {
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const loadingContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  articlePath: string;
  router: any;
};

class ArticlePage extends React.Component<Props> {
  render() {
    const { articlePath, router } = this.props;
    return (
      <Query query={GET_ARTICLE} variables={{ path: articlePath }}>
        {({ error, loading, data }) => {
          if (loading) {
            return (
              <div className={loadingContainer}>
                <FadeLoader />
              </div>
            );
          }
          if (error || !data || !data.article) {
            router.push("/");
            return null;
          }
          const { title, date, body } = data.article;
          return (
            <div className={container}>
              <h1 className="title">{title}</h1>
              <div className="date">
                Published on {new Date(date).toLocaleDateString()}
              </div>
              <article className="body">
                <ReactMarkdown source={body} />
              </article>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ArticlePage);
