import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { css } from "emotion";
import Rules from "../components/Rules/Rules";
import Records from "../components/Records";

const container = css`
  width: auto;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;

  display: grid;
  grid-template:
    "header header header" auto
    "sidebar rules records" auto
    / auto 1fr auto;
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

  @media screen and (max-width: 1300px) {
    grid-template:
      "header header" auto
      "sidebar rules" auto
      "sidebar records" auto
      / 400px 1fr;
  }

  @media screen and (max-width: 800px) {
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
  order: 2;
`;

const rules = css`
  grid-area: rules;
  position: relative;
  box-sizing: border-box;
  order: 1;
  margin-bottom: 20px;
`;

const records = css`
  grid-area: records;
  order: 3;
  @media screen and (max-width: 1300px) {
    display: flex;
    flex-wrap: wrap;
    & > div {
      margin: 0 5px;
    }
  }
`;

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
