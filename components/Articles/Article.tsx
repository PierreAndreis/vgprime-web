import React from "react";
import { css } from "emotion";
import boxCss from "../common/Box";
import ReactMarkdown from "react-markdown";
import FullArticle from "./FullArticle";
import Router from "next/router";

const container = css`
  ${boxCss};
  padding: 10px;
  max-height: 300px;
  & > .image > img {
    width: 100%;
    height: 150px;
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
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 10px 0px;
  }
  & > .body {
    overflow: hidden;
    text-overflow: ellipsis;
    & > .placeUp {
      position: absolute;
      top: 50%;
      width: 100%;
      height: 50%;
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 1));
      //background-color: green;
    }
  }
`;

export type Article = {
  path: string;
  title: string;
  date: string;
  image: string;
  body: string;
};

type Props = {
  article: Article;
};

type State = {
  articleOpen: boolean;
};

class ArticleItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      articleOpen: false,
    };
  }

  openArticle = (path: string) => {
    //this.setState({ articleOpen: true });
    Router.push(`/?articlePath=${path}`, `/article?path=${path}`);
  };

  closeArticle = () => {
    console.log("Close called");
    this.setState({ articleOpen: false }, () =>
      console.log("State changed! New value of articleOpen:", this.state.articleOpen)
    );
  };

  render() {
    const { path, title, image, date, body } = this.props.article;
    console.log("article statis: ", this.state.articleOpen);
    return (
      <div className={container} onClick={() => this.openArticle(path)}>
        <div className="image">{image && <img src={image} />}</div>
        <div className="title">{title && <h1>{title}</h1>}</div>
        <div className="date">{date && <h3>{date}</h3>}</div>
        <div className="body">
          <ReactMarkdown source={body} />
          <div className="placeUp" />
        </div>
      </div>
    );
  }
}

export default ArticleItem;
