import React from "react";
import { css } from "@emotion/core";
import RecordBox from "./RecordBox";

const records = css`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: center;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
export default () => (
  <div css={[records]}>
    <RecordBox type={"mostMVPs"} title="Most MVPs" />
    <RecordBox type={"mostGames"} title="Most Games Played" />
    <RecordBox type={"mostWins"} title="Most Wins" />
  </div>
);
