import React from "react";
import { css } from "emotion";
import ReactMarkdown from "react-markdown";
import boxCss from "../common/Box";

const container = css`
  ${boxCss};
  padding: 10px;
  img {
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
  a {
    color: blue;
  }
  h1 {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 10px 0px;
  }
`;

type Props = {
  content: string;
};

class Article extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { content } = this.props;
    return (
      <div className={container}>
        <ReactMarkdown source={content} />
      </div>
    );
  }
}

export default Article;
