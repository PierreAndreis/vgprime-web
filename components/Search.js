import React from "react";

import Box from "./common/Box";
import { css } from "emotion";
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
  width: 90%;
  border: 0;
  outline: 0;
  transparent: 0;
  padding: 15px;
  font-size: 15px;
`;

const submitButton = css`
  ${buttonCss};
  position: absolute;
  right: 0;
  width: 30%;
  height: 100%;
  margin: 0;
`;

class Search extends React.Component {
  state = {
    value: ""
  };

  changeInput = e => {
    const value = e.target.value;

    this.setState({
      value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    alert(this.state.value);
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
