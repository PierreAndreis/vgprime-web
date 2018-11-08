import React from "react";
import { css } from "emotion";
import boxCss from "../common/Box";
import ReactMarkdown from "react-markdown";
import Router from "next/router";

const container = css`
  padding: 10px;
  max-height: 300px;
  margin: 5px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0px;
  }
  & > .body {
    overflow: hidden;
    text-overflow: ellipsis;
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

const openArticle = (path: string) => {
  Router.push(`/article?path=${path}`);
};

const ArticleComponent: React.SFC<Props> = ({
  article: { path, title, image, date, body },
}) => {
  return (
    <div className={container} onClick={() => openArticle(path)}>
      <div className="image">{image && <img src={image} />}</div>
      <div className="title">{title && <h1>{title}</h1>}</div>
      <div className="date">{date && <h3>{date}</h3>}</div>
      <div className="body">
        <ReactMarkdown source={body} />
      </div>
    </div>
  );
};

export default ArticleComponent;
