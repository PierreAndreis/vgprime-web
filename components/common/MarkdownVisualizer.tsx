import * as React from "react";
import MarkdownContent from "./MarkdownContent";
import Layout, { Content } from "./Layout";
import { css } from "react-emotion";
import Box from "./Box";

const container = css`
  ${Box};
  padding: 10px;
`;

type Props = {
  markdown: string;
};

const MarkdownVisualizer: React.SFC<Props> = ({ markdown }) => (
  <Layout>
    <Content>
      <div className={container}>
        <MarkdownContent source={markdown} />
      </div>
    </Content>
  </Layout>
);

export default MarkdownVisualizer;
