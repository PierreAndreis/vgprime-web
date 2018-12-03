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
  padding: 10px;
  & h2 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`;

const hours = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  & > div {
    display: flex;
    justify-content: space-around;
    margin: 5px;
    font-size: 14px;
    .region {
      font-weight: bold;
      width: 50px;
    }
    .start {
      width: 30px;
    }
    .end {
      width: 40px;
    }
  }
`;

export default class extends React.Component<{}> {
  render() {
    return (
      <div className={container}>
        <h2>PRIME HOURS</h2>
        <div className={hours}>
          <div>
            <div className="region">REGION</div>
            <div className="start">START</div>
            <div className="end">END</div>
          </div>
          <div>
            <div className="region">NA</div>
            <div className="start">{new Date(1).toLocaleTimeString()}</div>
            <div className="end">9PM</div>
          </div>
          <div>
            <div className="region">NA</div>
            <div className="start">8PM</div>
            <div className="end">9PM</div>
          </div>
          <div>
            <div className="region">NA</div>
            <div className="start">8PM</div>
            <div className="end">9PM</div>
          </div>
          <div>
            <div className="region">NA</div>
            <div className="start">8PM</div>
            <div className="end">9PM</div>
          </div>
          <div>
            <div className="region">NA</div>
            <div className="start">8PM</div>
            <div className="end">9PM</div>
          </div>
        </div>
      </div>
    );
  }
}
