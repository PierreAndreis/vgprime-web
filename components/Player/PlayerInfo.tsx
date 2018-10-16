import { css } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/leaderboard";

import boxCss from "./../common/Box";

export type PlayerRowProps = {
  player?: Player;
};

const PlayerRow: React.SFC<PlayerRowProps> = ({ player }) => {
  if (player === undefined) return null;

  return (
    <div className={boxCss}>
      <div className="name">
        <SkeletonWrapper>{() => player.name}</SkeletonWrapper>
      </div>
    </div>
  );
};

export default PlayerRow;
