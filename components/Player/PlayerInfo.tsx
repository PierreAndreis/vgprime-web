import { css, cx } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/leaderboard";

import boxCss from "./../common/Box";


const container = css`
  ${boxCss};


  justify-content: row;
  height: 250px;

`;



export type PlayerRowProps = {
  player: Player | undefined;
}

const PlayerRow: React.SFC<PlayerRowProps> = ({ player }) => {
  if (player === undefined) return null;

  return (
    <div className={boxCss}>
      <div className="name">{player.name}</div>

    </div>
  );
};

export default PlayerRow;