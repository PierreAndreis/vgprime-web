import * as React from "react";
import PlayerRow from "./PlayerRow";
import Box from "../common/Box";
import Button from "./../common/Button";
import { SkeletonContext } from "../common/Skeleton";
import { css, cx } from "emotion";
import {PlayersList} from '../../graphql/leaderboard';

const container = css`
  ${Box};
  width: 360px;
  border-bottom: 20px solid rgba(0, 0, 0, 0.05);
`;

const navigationButtons = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: -15px;
  position: relative;
  z-index: 2;
`;

interface LeaderboardProps {
  players: PlayersList;
  loading: boolean;
  playerName?: string;
  nextHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  previousHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export {LeaderboardProps};

const Leaderboard = (
  { players, loading, playerName, 
    nextHandler, previousHandler 
  }: LeaderboardProps) => (
  <div>
    <div className={container}>
      <SkeletonContext.Provider
        value={loading ? "loading" : "loaded"}>
        {players.map(p => (
          <PlayerRow payload={p} isActive={p.name === playerName} key={p.rank} />
        ))}
      </SkeletonContext.Provider>
    </div>
    {
      nextHandler && previousHandler &&
      (
        <div className={cx(navigationButtons)}
        >
          <Button onClick={previousHandler} disabled={players.length === 0 || players[0].rank === 1}>
            Previous
          </Button>
          <Button onClick={nextHandler} disabled={!nextHandler}>Next</Button>
        </div>
      )
    }
  </div>
);
export default Leaderboard;

// export default class extends React.Component {
//   state = {
//     page: 0
//   };

//   next = () => {
//     this.setState(state => ({
//       page: state.page + 1
//     }));
//   };

//   previous = () => {
//     if (this.state.page === 0) return;

//     this.setState(state => ({
//       page: state.page - 1
//     }));
//   };

//   render() {
//     const rows = (leaderboard, loading = false, playerName = '') => (
//       <SkeletonContext.Provider
//         value={loading ? "loading" : "loaded"}>
//         {leaderboard.map(p => (
//           <PlayerRow key={p.id} payload={p} isActive={p.name === playerName} />
//         ))}
//       </SkeletonContext.Provider>
//     )
//     const hasData = this.props.data !== undefined && this.props.playerName !== undefined;
//     return (
//       "lol"
//     );
//   }
// }
