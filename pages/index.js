import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { css } from "emotion";
import Rules from "../components/Rules/Rules";
import Records from "../components/Records";

const container = css`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;

  display: grid;
  grid-template:
    "header header header" auto
    "sidebar rules records" auto
    / auto 1fr 300px;
  grid-column-gap: 15px;

  & h4 {
    font-size: 17px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 400px) {
    width: 380px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const header = css`
  grid-area: header;
  order: 0;

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
    color: black;
  }
`;

const sidebar = css`
  grid-area: sidebar;
  order: 3;
`;

const rules = css`
  grid-area: rules;
  position: relative;
  box-sizing: border-box;
  order: 1;
`;

const records = css`
  grid-area: records;
  order: 2;
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
      <div className={container}>
        <div className={header}>
          <div className={logo}>
            <b>VG</b>PRIME
          </div>
        </div>

        <div className={sidebar}>
          <h4>Leaderboard</h4>
          <Leaderboard />
        </div>
        <div className={rules}>
          <h4>Rules</h4>
          <Rules />
        </div>
        <div className={records}>
          <Records />
        </div>
      </div>
    );
  }
}
