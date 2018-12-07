import * as React from "react";
import { Query } from "react-apollo";
import { css } from "emotion";
import {
  byPage as qLeaderboard,
  PlayersList,
  list as qLeaderboardList,
} from "../graphql/leaderboard";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Records from "../components/Records";
import Layout, { Content, Sidebar } from "../components/common/Layout";
import { SkeletonContext } from "../components/common/Skeleton";
import Prizes from "../components/Prizes";
import Time from "../components/Time";
import BrokenMyth from "../components/Articles/BrokenMyth";
import Head from "next/head";
import DropDown from "../components/common/DropDown";

type Props = {
  query: Record<string, string | string[] | undefined>;
  weekendNumber: number;
};

type State = {
  page: number;
  leaderboard: string;
};

const top = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h4 {
    font-weight: 600;
    font-size: 18px;
  }
`;

type LeaderboardItem = {
  name: string;
  start: string;
  end: string;
  count: number;
};

export default class Home extends React.Component<Props, State> {
  initialState: State = {
    page: 0,
    leaderboard: "season 1",
  };
  state = this.initialState;

  next = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };
  previous = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };

  setLeaderboard = (leaderboard: string) => {
    this.setState({ leaderboard, page: 0 });
  };

  render() {
    return (
      <>
        <Head>
          <title>VGPRIME</title>
        </Head>
        <Query query={qLeaderboardList}>
          {({ error, data, loading }) => {
            let leaderboards: LeaderboardItem[] = [];
            if (!error && !loading && data) {
              leaderboards = data.leaderboardList;
            }
            return (
              <Query
                query={qLeaderboard}
                variables={{ page: this.state.page, name: this.state.leaderboard }}
              >
                {({ error, data, loading }) => {
                  let players: PlayersList =
                    data && data.leaderboard && data.leaderboard.length > 0
                      ? data.leaderboard
                      : [];

                  return (
                    <SkeletonContext.Provider
                      value={
                        loading || error || players.length === 0 ? "loading" : "loaded"
                      }
                    >
                      <Layout>
                        <Sidebar>
                          <div className={header}>
                            <h4>Leaderboard</h4>
                            <DropDown
                              onChange={(index, value) => this.setLeaderboard(value)}
                            >
                              {leaderboards.map(leaderboard => (
                                <DropDown.Item value={leaderboard.name}>
                                  {leaderboard.name} (
                                  {new Date(leaderboard.start).toLocaleDateString()} -{" "}
                                  {new Date(leaderboard.end).toLocaleDateString()})
                                </DropDown.Item>
                              ))}
                              {/* <ComboBox.Item value="season 1" />
                              <ComboBox.Item value="season 1 - weekend 1" /> */}
                            </DropDown>
                          </div>
                          <Leaderboard
                            players={players}
                            nextHandler={this.next}
                            previousHandler={this.previous}
                          />
                        </Sidebar>
                        <Content>
                          <div className={top}>
                            <BrokenMyth />
                            <Prizes />
                            <Time />
                          </div>
                          <Records />
                        </Content>
                      </Layout>
                    </SkeletonContext.Provider>
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </>
    );
  }
}
