import * as React from "react";
import Box from "./common/Box";
import { css } from "emotion";
import { buttonCss } from "./common/Button";
import { ApolloConsumer } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";

const searchBox = css`
  height: 45px;
  width: 100%;

  display: flex;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  padding: 0;
  margin: 15px auto;
`;

const input = css`
  ${Box};
  width: 99%;
  border: 0;
  outline: 0;
  padding: 15px;
  padding-right: 30%;
  font-size: 15px;
  border-radius: 30px;
  /* box-shadow: 3px 3px 5px #dcdcdc; */
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
  beforeSearch?: () => void;
  timeout?: number;
  placeholder?: string;
};

type State = {
  value: string;
  loading: boolean;
  errored: boolean;
  success: boolean;
};

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let defaultValue = this.props.defaultValue ? this.props.defaultValue : "";
    this.state = {
      value: defaultValue,
      loading: false,
      errored: false,
      success: false
    };
  }

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({
      value
    });
  };

  pushRoute = () => {
    Router.push({
      pathname: "/player",
      query: { name: this.state.value }
    });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <form
              onSubmit={async e => {
                e.preventDefault();
                this.setState({
                  loading: true,
                  errored: false,
                  success: false
                });
                this.forceUpdate();
                const { data } = (await client.query({
                  query: GET_PLAYER,
                  variables: { name: this.state.value }
                })) as any;
                this.setState({ loading: false });
                if (data.player === null) {
                  this.setState({ errored: true });
                } else {
                  this.setState({ success: true });

                  if (this.props.beforeSearch && this.props.timeout) {
                    this.props.beforeSearch();
                    setTimeout(this.pushRoute, this.props.timeout);
                  } else {
                    this.pushRoute();
                  }
                  const path = Router.pathname;
                  if (path === "/player") {
                    this.setState({ success: false });
                  }
                }
              }}
            >
              <div className={searchBox}>
                <input
                  className={input}
                  value={this.state.value}
                  onChange={this.changeInput}
                  placeholder={
                    this.props.placeholder ? this.props.placeholder : ""
                  }
                  autoFocus
                />
                <button
                  title={
                    this.state.errored
                      ? `Player not found!`
                      : "Search for the specified player"
                  }
                  className={submitButton}
                >
                  {this.state.loading === true || this.state.success === true
                    ? "Searching..."
                    : "Search"}{" "}
                  {this.state.errored === true && "<!>"}
                </button>
              </div>
            </form>
          );
        }}
      </ApolloConsumer>
    );
  }
}

// @ts-ignore Argument of type 'typeof Search' is not assignable to parameter of type 'ComponentType<Props & WithRouterProps<Record<string, string | string[] | undefined>>>'.
export default Search;
