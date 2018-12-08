import * as React from "react";
import MarkdownContent from "./common/MarkdownContent";
import Layout, { Content, Sidebar } from "./common/Layout";
import { css } from "react-emotion";
import Box from "./common/Box";
import LeaderboardContainer from "./Leaderboard/LeaderboardContainer";

const container = css`
  ${Box};
  padding: 10px;
`;

type Props = {
  markdown: string;
};

class MarkdownVisualizer extends React.Component<Props> {
  render() {
    return (
      <Layout>
        <Sidebar>
          <LeaderboardContainer />
        </Sidebar>
        <Content>
          <div className={container}>
            <MarkdownContent source={this.props.markdown} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default MarkdownVisualizer;
