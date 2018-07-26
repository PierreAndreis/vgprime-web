import React from "react";
import Container from "../components/common/Container";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { css } from "emotion";

const header = css`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 2%;
`;

const logo = css`
  width: 150px;
  height: 40px;

  color: blue;
  font-weight: bold;
  font-size: 35px;

  & > b {
    color: black;
  }
`;

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <div className={header}>
          <div className={logo}>
            <b>VG</b>PRIME
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Leaderboard />
          <div>lol</div>
        </div>
      </Container>
    );
  }
}
