import React from "react";
import { css } from "emotion";
import boxCss from "../common/Box";
import ReactMarkdown from "react-markdown";

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
  title: string;
  date: string;
  image: string;
  body: string;
};

type Props = {
  article: Article;
};

class ArticleItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { title, image, date, body } = this.props.article;

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
  }
}

export default ArticleItem;
