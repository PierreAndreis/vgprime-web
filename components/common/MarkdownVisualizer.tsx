import * as React from "react";
import MarkdownContent from "./MarkdownContent";
import Layout, { Content, Sidebar } from "./Layout";
import { css } from "@emotion/core";
import Box from "./Box";
import { Query } from "react-apollo";
import { PlayersList } from "../../graphql/leaderboard";
import { SkeletonContext } from "./Skeleton";
import Leaderboard from "../Leaderboard/Leaderboard";
import { byPage as qLeaderboard } from "../../graphql/leaderboard";

const container = css`
  ${Box};
  padding: 10px;
`;

type Props = {
  markdown: string;
};

type State = {
  page: number;
};

class MarkdownVisualizer extends React.Component<Props, State> {
  initialState: State = {
    page: 0,
  };
  state = this.initialState;

  next = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  previous = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };

  render() {
    return (
      <Query query={qLeaderboard} variables={{ page: this.state.page }}>
        {({ error, data, loading }) => {
          let players: PlayersList =
            data && data.leaderboard && data.leaderboard.length > 0
              ? data.leaderboard
              : [];

          return (
            <SkeletonContext.Provider
              value={loading || error || players.length === 0 ? "loading" : "loaded"}
            >
              <Layout>
                <Sidebar>
                  <h4>Leaderboard</h4>
                  <Leaderboard
                    players={players}
                    nextHandler={this.next}
                    previousHandler={this.previous}
                  />
                </Sidebar>
                <Content>
                  <div css={[container]}>
                    <MarkdownContent source={this.props.markdown} />
                  </div>
                </Content>
              </Layout>
            </SkeletonContext.Provider>
          );
        }}
      </Query>
    );
  }
}

export default MarkdownVisualizer;
