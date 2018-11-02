import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { css } from "emotion";
import ReactMarkdown from "react-markdown";
import { withRouter } from "next/router";

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

const container = css``;

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
              <div className="body">
                <ReactMarkdown source={body} />
                <div className="placeUp" />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ArticlePage);
