import React from "react";
import { css } from "emotion";
import Test from "./RecordBox";

const grid4x4 = css`
  margin: 10px 0;
`;

export default props => (
  <div className={grid4x4}>
    <Test type={"mostMVPs"} title="Most MVPs" />
    <Test type={"mostGames"} title="Most Games Played" />
    <Test type={"mostWins"} title="Most Wins" />
  </div>
);
