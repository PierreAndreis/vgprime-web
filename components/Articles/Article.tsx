import React from "react";
import { css } from "@emotion/core";
// @ts-ignore
import { Link } from "./../../routes";
import Box from "../common/Box";

const container = css`
  ${Box}
  flex-shrink: 0;
  flex-grow: 0;
  display: block;
  width: 250px;
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
    font-size: 18px;
    font-weight: 800;
  }

  img {
    display: none;
    width: 64px;
    height: 64px;
    object-fit: cover;
  }

  p {
    padding-top: 5px;
    font-size: 14px;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    background-size: 0;
    padding: 10px;
    height: auto;
    display: flex;
    flex-direction: row;
    margin: 0;
    box-shadow: none;
    border-top: 1px solid rgba(75, 75, 75, 0.1);
    border-radius: 0;

    &:first-of-type {
      border-bottom: 0;
    }

    img {
      display: inline-block;
    }
    div {
      position: relative;
      background: 0;
      bottom: 0;
      flex: 1;
      height: 100%;
      color: black;
      text-align: left;
    }
    h3 {
      font-weight: 400;
    }
  }
`;

export type Article = {
  attributes: {
    path: string;
    title: string;
    date: string;
    image: string;
  };
  body?: string;
};

type Props = {
  article: Article;
};

const ArticleComponent: React.SFC<Props> = ({
  article: {
    attributes: { path, title, image },
  },
}) => {
  let linkProps: {
    route?: string;
    params?: { path: string };
    href?: string;
  } = {
    route: "article",
    params: { path },
  };

  if (path.startsWith("http")) {
    linkProps = {
      href: path,
    };
  }

  return (
    <Link {...linkProps}>
      <a
        css={[container]}
        style={{ backgroundImage: `url(${image})` }}
        target={path.startsWith("http") ? "_blank" : undefined}
      >
        <img src={image} alt={title} />
        <div>
          <h3>{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default ArticleComponent;
