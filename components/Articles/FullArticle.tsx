import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { css } from "emotion";
import ReactMarkdown from "react-markdown";
import { withRouter } from "next/router";
import contentStyle from "./ContentStyle";

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
  & > .title > h1 {
    font-size: 26px;
    font-weight: 600;
    text-align: center;
    margin: 10px 0px;
  }
  & > .body {
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
          if (error) {
            return <div>Big failure: {error.message}</div>;
          }
          if (loading) {
            return <div>Searching for the requested article...</div>;
          }
          if (!data || !data.article) {
            router.push("/");
            return null;
          }
          const { title, date, image, body } = data.article;
          return (
            <div className={container}>
              <div className="image">{image && <img src={image} />}</div>
              <div className="title">{title && <h1>{title}</h1>}</div>
              <div className="date">{date && <h3>{date}</h3>}</div>
              <article className="body">
                <ReactMarkdown source={body} />
                <div className="placeUp" />
              </article>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ArticlePage);
