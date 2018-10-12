import * as React from "react";
import Box from "./common/Box";
import { css } from "emotion";
import Router from 'next/router';
import { buttonCss } from "./common/Button";

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
  transparent: 0;
  padding: 15px;
  padding-right: 30%;
  font-size: 15px;
  border-radius: 30px;
  box-shadow: 3px 3px 5px #dcdcdc;
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

type State = {
  value: string
}


class Search extends React.Component<{}, State> {
  state = {
    value: ""
  };

  changeInput = (e: any) => {
    const value = e.target.value;

    this.setState({
      value
    });
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    Router.push({pathname: '/player', query: {name: this.state.value}});
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className={searchBox}>
          <input
            className={input}
            value={this.state.value}
            onChange={this.changeInput}
          />
          <button className={submitButton}>Search</button>
        </div>
      </form>
    );
  }
}

export default Search;
