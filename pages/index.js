import React from "react";
import Container from "../components/common/Container";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { css } from "emotion";
import Rules from "../components/Rules/Rules";

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

  color: #7aaeff;
  font-weight: bold;
  font-size: 35px;

  & > b {
    color: white;

    color: black;
  }
`;

const content = css`
  display: flex;

  & > div {
    box-sizing: border-box;
    padding: 15px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

// const test = css`
//   position: absolute;
//   width: 100%;
//   height: 30%;
//   overflow: hidden;
//   transform: skewY(-12deg);
//   transform-origin: 0;
//   z-index: -1;
//   background: linear-gradient(
//     150deg,
//     #7aaeff 15%,
//     #77c8f5 70%,
//     #74e1eb 94%
//   );
//   /* background-image: linear-gradient(-45deg, #7aaeff 0%, #74e1eb 100%); */
// `;

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <div className={header}>
          <div className={logo}>
            <b>VG</b>PRIME
          </div>
        </div>
        <div className={content}>
          <div style={{ flex: 1 }}>
            <h4>Rules & Prizes</h4>
            <Rules />
          </div>
          <div>
            <h4>Leaderboard</h4>
            <Leaderboard />
          </div>
        </div>
      </Container>
    );
  }
}
