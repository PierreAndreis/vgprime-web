import React from "react";
import { css } from "emotion";
import Link from "next/link";
import Box from "../common/Box";

const container = css`
  ${Box}
  display: block;
  width: 100%;
  margin: 10px;
  height: 150px;

  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  & > div {
    position: absolute;
    color: white;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    text-align: right;
    padding: 15px;
    bottom: 0;
  }

  h3 {
    font-size: 14px;
    font-weight: 800;
  }

  img {
    display: none;
  }

  @media screen and (max-width: 500px) {
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

const ArticleComponent: React.SFC<Props> = ({ article: { path, title, image } }) => {
  // const prettyDate = new Date(date).toLocaleDateString();
  return (
    <Link href={`/article?path=${path}`}>
      <a className={container} style={{ backgroundImage: `url(${image})` }}>
        <img src={image} alt={title} />
        <div>
          <h3>{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default ArticleComponent;
