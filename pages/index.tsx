import * as React from "react";
import { css } from "emotion";
import LeaderboardContainer from "../components/Leaderboard/LeaderboardContainer";
import Records from "../components/Records";
import Layout, { Content, Sidebar } from "../components/common/Layout";
import Prizes from "../components/Prizes";
import Time from "../components/Time";
import BrokenMyth from "../components/Articles/BrokenMyth";
import Head from "next/head";

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
export default class Home extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Head>
          <title>VGPRIME</title>
        </Head>

        <Layout>
          <Sidebar>
            <LeaderboardContainer />
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
      </>
    );
  }
}
