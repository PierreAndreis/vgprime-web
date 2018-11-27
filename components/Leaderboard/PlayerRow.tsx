import { css, keyframes, cx } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";
import { Player } from "../../graphql/leaderboard";

// @ts-ignore
import { Link } from "../../routes";

const enteringAnimation = keyframes`
  0% {
    background-position: 100% 0%
  }
  100% {
    background-position: 0% 50%
  }
`;

const playerActiveBackground = css`
  background-image: linear-gradient(to right, rgb(66, 134, 244, 0.3), white, white);
  background-size: 150% 150%;
  animation: ${enteringAnimation} 0.4s ease forwards;
`;

const playerWrap = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2px 5px;
  height: 54.5px;

  display: flex;
  align-items: center;
  color: rgb(231, 231, 231);
  color: #4a4a4a;

  transition: all 300ms;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  & > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  &:last-of-type {
    border: 0;
  }
`;

const position = css`
  width: 50px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #4a90e2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  & > span:nth-child(2) {
    flex-grow: 1;
  }
`;

const positionChange = css`
  position: relative;
  height: 12px;
  font-size: 9px;
  text-align: center;
  &.up {
    color: green;
  }
  &.down {
    color: #ff3838;
  }
`;

const info = css`
  width: 140px;
  font-size: 14px;

  font-family: "Roboto Condensed";
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & i {
    font-size: 20px;
    color: #eaa900;
    margin-right: 5px;
  }
  & > div {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    & > span {
      margin: 0 5px;
      padding-top: 2px;
      font-size: 12px;
      color: rgba(100, 100, 100, 0.5);
      text-transform: uppercase;
    }
  }
`;

const games = css`
  width: 50px;
  text-align: center;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  & > div {
    font-size: 16px;
    font-family: "Roboto Condensed";
    font-weight: bold;
  }
  & > span {
    margin-top: 5px;
    font-size: 10px;
    font-weight: bold;
    color: #adadad;
  }
`;

const points = css`
  width: 60px;
  text-align: center;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  & > div {
    font-size: 16px;
    font-family: "Roboto Condensed";
    font-weight: bold;
    color: #4a90e2;
  }
  & > span {
    margin-top: 5px;
    font-size: 10px;
    font-weight: bold;
    color: #adadad;
  }
`;

const winRateBar = css`
  width: 50px;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  & > div {
    background-image: linear-gradient(-45deg, #7aaeff 0%, #74e1eb 100%);
    height: 100%;
    border-radius: 200px;
  }
`;

const winRateLabel = css`
  font-size: 11px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-top: 3px;
`;

export type PlayerRowProps = {
  payload?: Player;
  isActive: boolean;
};

const PlayerRow: React.SFC<PlayerRowProps> = ({ payload, isActive = false }) => {
  let winPercent: number = 0;

  if (payload) {
    winPercent = (payload.wins / payload.games) * 100;
  }

  let psChangeUp = payload && payload.positionChange > 0 && (
    <>{payload.positionChange}▲</>
  );
  let psChangeDown = payload && payload.positionChange < 0 && (
    <>{payload.positionChange}▼</>
  );

  return (
    <Link route="player" params={{ name: payload ? payload.name : "/" }} prefetch>
      <a className={cx(playerWrap, { [playerActiveBackground]: isActive })}>
        <div className={position}>
          <SkeletonWrapper width={30}>
            {() => (
              <>
                <span className={cx(positionChange, "up")}>{psChangeUp}</span>
                <span>{payload ? payload.rank : ""}</span>
                <span className={cx(positionChange, "down")}>{psChangeDown}</span>
              </>
            )}
          </SkeletonWrapper>
        </div>

        <div className={info}>
          <div>
            <SkeletonWrapper width={100}>
              {() => [
                <i key="tier" className={`vg-rank-${payload ? payload.tier : 1}`} />,
                payload ? payload.name : "Unknown",
                <span key="region">
                  {payload ? (payload.region === "sg" ? "sea" : payload.region) : "NA"}
                </span>,
              ]}
            </SkeletonWrapper>
          </div>
          <div style={{ padding: "1px" }}>
            <SkeletonWrapper width={50} height={8}>
              {() => (
                <div className={winRateBar}>
                  <div style={{ width: `${winPercent}%` }} />
                </div>
              )}
            </SkeletonWrapper>

            <div className={winRateLabel}>{Math.floor(winPercent) || 0}% W/R</div>
          </div>
        </div>
        <div className={games}>
          <div>
            <SkeletonWrapper width={30}>
              {() => (payload ? payload.mvp : 0)}
            </SkeletonWrapper>
          </div>
          <span>MVPs</span>
        </div>
        <div className={games}>
          <div>
            <SkeletonWrapper width={30}>
              {() => (payload ? payload.games : 0)}
            </SkeletonWrapper>
          </div>
          <span>GAMES</span>
        </div>

        <div className={points}>
          <div>
            <SkeletonWrapper width={30}>
              {() => (payload ? payload.points : "?")}
            </SkeletonWrapper>
          </div>
          <span>POINTS</span>
        </div>
      </a>
    </Link>
  );
};

export default PlayerRow;
