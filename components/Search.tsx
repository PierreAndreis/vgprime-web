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
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
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

const triangleStyle = css`
  position: absolute;
  right: 0;
  top: 0;
`;

const triangleError = (
  <svg
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{ marginTop: -2 }}
  >
    {/* <path
      d="M479.963,425.047L269.051,29.854c-5.259-9.88-15.565-16.081-26.782-16.081h-0.03
				c-11.217,0-21.492,6.171-26.782,16.051L3.603,425.016c-5.046,9.485-4.773,20.854,0.699,29.974
				c5.502,9.15,15.413,14.774,26.083,14.774H453.12c10.701,0,20.58-5.594,26.083-14.774
				C484.705,445.84,484.979,434.471,479.963,425.047z M242.239,408.965c-16.781,0-30.399-13.619-30.399-30.399
				c0-16.78,13.619-30.399,30.399-30.399c16.75,0,30.399,13.619,30.399,30.399C272.638,395.346,259.02,408.965,242.239,408.965z
				 M272.669,287.854c0,16.811-13.649,30.399-30.399,30.399c-16.781,0-30.399-13.589-30.399-30.399V166.256
				c0-16.781,13.619-30.399,30.399-30.399c16.75,0,30.399,13.619,30.399,30.399V287.854z"
    /> */}
    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M11,17H13V11H11V17Z" />
  </svg>
);

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
                  {this.state.loading
                    ? "..."
                    : this.state.error
                    ? triangleError
                    : "Search"}{" "}
                  {/* {this.state.error && triangleError} */}
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
