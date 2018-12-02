import * as React from "react";
import PlayerRow from "./PlayerRow";
import Box from "../common/Box";
import Button from "./../common/Button";
import { css, cx } from "emotion";
import { PlayersList } from "../../graphql/leaderboard";

const container = css`
  ${Box};
  overflow: hidden;
  border-bottom: 20px solid white;
  border-radius: 10px;
`;

const navigationButtons = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: -15px;
`;

export interface LeaderboardProps {
  players: PlayersList;
  playerName?: string;
  nextHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  previousHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PLAYER_PER_PAGE = 10;

const Leaderboard = ({
  players,
  playerName,
  nextHandler,
  previousHandler,
}: LeaderboardProps) => {
  return (
    <div>
      <div className={container}>
        {Array.from({ length: PLAYER_PER_PAGE }, (_, k) => k + 1).map((_, index) => (
          <PlayerRow
            payload={players[index]}
            isActive={players[index] && players[index].name === playerName}
            key={index}
          />
        ))}
      </div>
      <div className={cx(navigationButtons)}>
        <Button
          onClick={previousHandler}
          disabled={
            !previousHandler ||
            players.length === 0 ||
            (players[0] && players[0].rank === 1)
          }
        >
          Previous
        </Button>
        <Button onClick={nextHandler} disabled={!nextHandler}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default Leaderboard;
