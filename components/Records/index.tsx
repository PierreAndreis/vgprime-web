import React from "react";
import RecordBox from "./RecordBox";

export default () => (
  <>
    <RecordBox type={"mostMVPs"} title="Most MVPs" />
    <RecordBox type={"mostGames"} title="Most Games Played" />
    <RecordBox type={"mostWins"} title="Most Wins" />
  </>
);
