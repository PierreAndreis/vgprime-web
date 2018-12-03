import * as React from "react";
import { css } from "emotion";
import Box from "./common/Box";

const container = css`
  ${Box};
  width: 100%;
  background-image: linear-gradient(-135deg, #84aff5 0%, #91dde9 100%);
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin: 10px;
  height: 150px;
  & h2 {
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    & small {
      display: block;
      margin: 0;
      font-size: 24px;
    }
  }

  p {
    font-size: 16px;
    margin: 5px 0;
  }
`;

export default class extends React.Component<{}> {
  render() {
    return (
      <div className={container}>
        <h2>
          +$1000<small>in prizes</small>
        </h2>
        <p>Click here to learn more</p>
      </div>
    );
  }
}
