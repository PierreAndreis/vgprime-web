import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { css } from "emotion";
import Prizes from "../components/Prizes";
import Records from "../components/Records";
import Search from "../components/Search";

const container = css`
  width: auto;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  display: grid;
  grid-template:
    "header header" auto
    "prizes sidebar" auto
    "content sidebar" 1fr
    / 1fr 360px;
  grid-column-gap: 10px;

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
      "sidebar prizes" auto
      "sidebar content" auto
      / 360px 1fr;
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
  width: 180px;
  height: 60px;

  background: url("/static/images/logo.png") no-repeat;
  background-size: contain;

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

const prizes = css`
  grid-area: prizes;
  position: relative;
  order: 1;
`;

const content = css`
  grid-area: content;
  order: 3;
`;

const records = css`
  grid-area: content;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const searchArea = css`
  width: 330px;
  box-sizing: border-box;
  margin: 15px auto 30px;
`;

export default class Home extends React.Component {
  render() {
    return (
      <div className={container}>
        <div className={header}>
          <div className={logo} />
        </div>

        <div className={sidebar}>
          <h4>Leaderboard</h4>
          <Leaderboard />
        </div>
        <div className={prizes}>
          <h4>Prizes</h4>
          <Prizes />
        </div>
        <div className={content}>
          <div className={searchArea}>
            <h4>Search a Player</h4>
            <Search />
          </div>
          <div className={records}>
            <Records />
          </div>
        </div>
      </div>
    );
  }
}
