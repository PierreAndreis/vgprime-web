import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";

const LEADERBOARD = gql`
  query Leaderboard($page: Int) {
    leaderboard(page: $page) {
      id
      name
      points
      rank
      region
      games
      wins
    }
  }
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
      <Query query={LEADERBOARD} variables={{ page: this.state.page }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <ErrorMessage message={error.message} />;

          return (
            <div>
              {data.leaderboard.map(p => (
                <div key={p.id}>
                  <h3>
                    #{p.rank} {p.name} ({p.region})
                  </h3>
                  <div>
                    Points: {p.points} Games: {p.games} Wins: {p.wins}{" "}
                  </div>
                </div>
              ))}
              <button
                onClick={this.previous}
                disabled={this.state.page === 0}
              >
                Previous
              </button>
              <button onClick={this.next}>Next</button>
            </div>
          );
        }}
      </Query>
    );
  }
}
