import React from "react";
import { Query } from "react-apollo";
import { css } from "emotion";

import { byPage as qLeaderboard } from "../../graphql/leaderboard";
import { SkeletonContext } from "../common/Skeleton";
import Leaderboard from "./Leaderboard";
import LeaderboardMobile from "./LeaderboardMobile";

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type State = {
  page: number;
  leaderboard: "weekly" | "global";
};

type Props = {
  playerName?: string;
};

class LeaderboardContainer extends React.Component<Props, State> {
  state: State = {
    page: 0,
    leaderboard: "global",
  };

  nextPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  prevPage = () => {
    this.setState(({ page }) => ({
      page: page - 1,
    }));
  };

  render() {
    const { playerName } = this.props;
    const { page } = this.state;

    return (
      <>
        <header className={header}>
          <h4>Leaderboard</h4>
        </header>
        <Query query={qLeaderboard} variables={{ page, playerName, name: "season 1" }}>
          {({ data, loading }) => {
            let players = [];
            if (!loading && data && data.leaderboard) {
              players = data.leaderboard;
            }

            const allowNextHandler = !loading && !playerName;
            const allowPrevHandler = allowNextHandler && page > 0;

            return (
              <SkeletonContext.Provider value={loading}>
                <Leaderboard
                  players={players}
                  playerName={playerName}
                  previousHandler={allowPrevHandler ? this.prevPage : undefined}
                  nextHandler={allowNextHandler ? this.nextPage : undefined}
                />
              </SkeletonContext.Provider>
            );
          }}
        </Query>
      </>
    );
  }
}

export default (props: Props) => (
  <>
    <div className="invisibleOnMobile">
      <LeaderboardContainer {...props} />
    </div>
    <div className="visibleOnMobile">
      <LeaderboardMobile>
        <LeaderboardContainer {...props} />
      </LeaderboardMobile>
    </div>
  </>
);
