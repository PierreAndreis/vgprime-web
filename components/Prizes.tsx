import * as React from "react";
import { css } from "emotion";
import Box from "./common/Box";

const container = css`
  ${Box};
  background-image: linear-gradient(-135deg, #84aff5 0%, #91dde9 100%);
  color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px 10%;

  ${"" /* & p {
    font-size: 14px;
    margin-bottom: 10px;
  }
 */};
  & h1 {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 10px 0;
  }
`;

export default class extends React.Component<{}> {
  render() {
    return (
      <div className={container}>
        {Array.from(Array(6), i => i).map((_, index) => (
          <div
            key={index}
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              // background: "rgba(100, 100, 100, 0.8)",
              border: "3px solid white",
              marginLeft: "10px",
              flexShrink: 0,
              flexGrow: 0
            }}
          />
        ))}
      </div>
    );
  }
}
