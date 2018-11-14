import React from "react";
import { css } from "emotion";
import Link from "next/link";
import Box from "../common/Box";

const container = css`
  ${Box}
  display: block;
  box-sizing: border-box;
  margin: 10px;

  flex: 1;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  & > div {
    position: absolute;
    color: white;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    text-align: right;
    padding: 15px;
    box-sizing: border-box;
    bottom: 0;
  }

  h3 {
    font-size: 14px;
    font-weight: 800;
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
        <div>
          {/* <div className="date">{prettyDate}</div> */}
          <h3>{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default ArticleComponent;
