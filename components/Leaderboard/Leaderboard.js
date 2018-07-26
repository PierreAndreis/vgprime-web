import React from "react";
import { Query } from "react-apollo";
import PlayerRow from "./PlayerRow";

import qLeaderboard from "../../graphql/leaderboard";

import ErrorMessage from "../common/ErrorMessage";
import { Box } from "../common/Box";
import Button from "./../common/Button";

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
        <Box>
          <Query
            query={qLeaderboard}
            variables={{ page: this.state.page }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading</p>;
              if (error) return <ErrorMessage message={error.message} />;

              return data.leaderboard.map(p => (
                <PlayerRow key={p.id} payload={p} />
              ));
            }}
          </Query>
        </Box>

        <div>
          <Button onClick={this.previous} disabled={this.state.page === 0}>
            Previous
          </Button>
          <Button onClick={this.next}>Next</Button>
        </div>
      </div>
    );
  }
}
