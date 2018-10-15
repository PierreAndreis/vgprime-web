import * as React from "react";
import Box from "./common/Box";
import { css } from "emotion";
import { withRouter } from "next/router";
import { buttonCss } from "./common/Button";
import { ApolloConsumer } from "react-apollo";
import Router from 'next/router';
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

type State = {
  value: string;
  loading: boolean;
  errored: boolean;
  success: boolean;
};

class Search extends React.Component<any, State> {
  constructor(props: any) {
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

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                this.setState({loading: true, errored: false, success: false});
                this.forceUpdate();
                const { data } = await client.query({
                  query: GET_PLAYER,
                  variables: { name: this.state.value }
                }) as any;
                this.setState({loading: false});
                if (data.player === null) {
                  this.setState({errored: true});
                } else {
                  this.setState({success: true});
                  const path = Router.pathname;
                  await Router.push({
                    pathname: "/player",
                    query: { name: this.state.value }
                  });
                  if (path === '/player') {
                    this.setState({success: false});
                  }
                }
              }}
            >
              <div className={searchBox}>
                <input
                  className={input}
                  value={this.state.value}
                  onChange={this.changeInput}
                  autoFocus
                />
                <button title={this.state.errored ? `Player not found!`: 'Search for the specified player'} className={submitButton}>{this.state.loading === true || this.state.success === true ? 'Searching...' : 'Search'} {this.state.errored === true && '<!>'}</button>
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
