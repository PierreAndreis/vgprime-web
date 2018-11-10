import React from "react";
import { css } from "emotion";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { PrettyDate } from "../../lib/date-management";

const container = css`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;
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
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0px;
  }
  & > .body {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 16px;
    color: #5c5c5c;
    font-weight: 400;
    max-height: 300px;
  }
  & > .date {
    background: transparent;
    margin-top: 5px;
    font-weight: 400;
    font-size: 12px;
    align-self: flex-start;
    justify-self: flex-start;
    //text-transform: uppercase;
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
  const prettyDate = PrettyDate(new Date(date));
  return (
    <div className={container} onClick={() => openArticle(path)}>
      <div className="image">{image && <img src={image} />}</div>
      <div className="title">{title && <h1>{title}</h1>}</div>
      <div className="body">
        <ReactMarkdown source={body} />
      </div>
      <div className="date">{date && <>{prettyDate}</>}</div>
    </div>
  );
};

export default ArticleComponent;
