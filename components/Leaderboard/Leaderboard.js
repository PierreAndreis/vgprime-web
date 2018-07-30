import React from "react";
import { Query } from "react-apollo";
import PlayerRow from "./PlayerRow";

import qLeaderboard from "../../graphql/leaderboard";

import ErrorMessage from "../common/ErrorMessage";
import Box from "../common/Box";
import Button from "./../common/Button";
import { SkeletonContext } from "../common/Skeleton";
import { css } from "../../node_modules/emotion";

const container = css`
  ${Box};
  border-bottom: 20px solid rgba(0, 0, 0, 0.05);
`;

export default class extends React.Component {
  state = {
    page: 0
  };

  next = () => {
    this.setState(state => ({
      page: state.page + 1
    }));
  };

  previous = () => {
    if (this.state.page === 0) return;

    this.setState(state => ({
      page: state.page - 1
    }));
  };

  render() {
    return (
      <div>
        <div className={container}>
          <Query
            query={qLeaderboard}
            variables={{ page: this.state.page }}
          >
            {({ loading, error, data }) => {
              if (error) return <ErrorMessage message={error.message} />;

              return (
                <SkeletonContext.Provider
                  value={loading ? "loading" : "loaded"}
                >
                  {data.leaderboard.map(p => (
                    <PlayerRow key={p.id} payload={p} />
                  ))}
                </SkeletonContext.Provider>
              );
            }}
          </Query>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "-15px",
            position: "relative",
            zIndex: "2"
          }}
        >
          <Button onClick={this.previous} disabled={this.state.page === 0}>
            Previous
          </Button>
          <Button onClick={this.next}>Next</Button>
        </div>
      </div>
    );
  }
}
