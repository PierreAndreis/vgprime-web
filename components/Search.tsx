import * as React from "react";
import Box from "./common/Box";
import { css } from "emotion";
import { buttonCss } from "./common/Button";
import { ApolloConsumer } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import { ApolloClient, InMemoryCache } from "apollo-boost";

const searchBox = css`
  height: 40px;
  width: 100%;

  display: flex;
  flex-direction: row;
  position: relative;
  padding: 0;
`;

const input = css`
  ${Box};
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  padding: 15px;
  margin: 0;
  padding-right: 30%;
  font-size: 15px;
  border-radius: 30px;
`;

const submitButton = css`
  ${buttonCss};
  position: absolute;
  right: 0;
  width: 30%;
  height: 100%;
  margin: 0;
  border-radius: 100px;
`;

const GET_PLAYER = gql`
  query getPlayer($name: String!) {
    player(name: $name) {
      id
    }
  }
`;

type Props = {
  defaultValue?: string;
  placeholder?: string;
};

type State = {
  value: string;
  loading: boolean;
  error: boolean;
  success: boolean;
};

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let defaultValue = this.props.defaultValue ? this.props.defaultValue : "";
    this.state = {
      value: defaultValue,
      loading: false,
      error: false,
      success: false,
    };
  }

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({
      value,
      loading: false,
      error: false,
    });
  };

  pushRoute = () => {
    Router.push({
      pathname: "/player",
      query: { name: this.state.value },
    });
  };

  onSubmit = (client: ApolloClient<InMemoryCache>) => async (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: false,
      success: false,
    });
    try {
      const { data } = (await client.query({
        query: GET_PLAYER,
        variables: { name: this.state.value },
      })) as any;
      if (data.player === null) {
        this.setState({ error: true, loading: false });
      } else {
        this.setState({ success: true });
        const path = Router.pathname;
        this.pushRoute();
        if (path === "/player") {
          this.setState({ success: false, value: "" });
        }
      }
    } catch {
      this.setState({ error: true, success: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <form onSubmit={this.onSubmit(client)}>
              <div className={searchBox}>
                <input
                  className={input}
                  value={this.state.value}
                  onChange={this.changeInput}
                  placeholder={"Search for a player"}
                />
                <button className={submitButton} disabled={this.state.loading}>
                  {this.state.loading ? "..." : "Search"} {this.state.error && "<!>"}
                </button>
              </div>
            </form>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
