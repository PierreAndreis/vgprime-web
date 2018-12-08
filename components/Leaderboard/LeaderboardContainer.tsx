import React from "react";
import { Query } from "react-apollo";
import { css, cx } from "emotion";

import { byPage as qLeaderboard } from "../../graphql/leaderboard";
import { SkeletonContext } from "../common/Skeleton";
import Leaderboard from "./Leaderboard";
import LeaderboardMobile from "./LeaderboardMobile";

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const toggle = css`
  display: flex;
  width: 200px;
  border-radius: 5px;
  justify-content: space-around;
  border: 2px solid #84aff5;
  overflow: hidden;
  & > div {
    padding: 2px 5px;
    flex-grow: 1;
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    &.active {
      background: #84aff5;
      color: white;
    }
  }

  @media screen and (max-width: 800px) {
    width: 150px;
    margin-left: 10px;
    & > div {
      font-size: 9px;
    }
  }
`;

type State = {
  page: number;
  type: "weekly" | "monthly";
};

type Props = {
  playerName?: string;
};

const isItWeekend = new Date().getDay() == 6 || new Date().getDay() == 0;

class LeaderboardContainer extends React.Component<Props, State> {
  state: State = {
    page: 0,
    type: isItWeekend ? "weekly" : "monthly",
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

  changeType = (type: "weekly" | "monthly") => () => {
    this.setState({
      type,
    });
  };

  render() {
    const { playerName } = this.props;
    const { page, type } = this.state;

    return (
      <>
        <header className={header}>
          <h4>Leaderboard</h4>
          <div className={toggle}>
            <div
              className={cx(type === "monthly" && "active")}
              onClick={this.changeType("monthly")}
            >
              Season
            </div>
            <div
              className={cx(type === "weekly" && "active")}
              onClick={this.changeType("weekly")}
            >
              Weekend
            </div>
          </div>
        </header>
        <Query query={qLeaderboard} variables={{ page, playerName, type }}>
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
