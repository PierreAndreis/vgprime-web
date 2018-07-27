import { css } from "emotion";
import { SkeletonWrapper } from "../common/Skeleton";

const playerWrap = css`
  padding: 2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
  margin-bottom: 5px;

  height: 50px;

  display: flex;
  align-items: center;
  color: rgb(231, 231, 231);
  color: #4a4a4a;

  border-sizing: border-box;

  & > div {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const position = css`
  width: 25px;
  text-align: right;
  padding-right: 25px;
  border-sizing: border-box;

  font-size: 16px;
  font-weight: bold;
  color: #4a90e2;
`;

const info = css`
  width: 130px;
  font-size: 14px;

  font-family: "Roboto Condensed";
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & i {
    font-size: 18px;
    margin: 0 5px;
    color: #eaa900;
  }
  & > div {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const games = css`
  width: 60px;
  text-align: center;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  & > div {
    font-size: 15px;
  }
  & > span {
    margin-top: 5px;
    font-size: 11px;
  }
`;

const points = css`
  width: 60px;
  text-align: center;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  & > div {
    font-size: 18px;
  }
  & > span {
    margin-top: 5px;
    font-size: 11px;
  }
`;

const winRateBar = css`
  width: 50px;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  margin-left: 5px;

  & > div {
    background-image: linear-gradient(-45deg, #7aaeff 0%, #74e1eb 100%);
    height: 100%;
  }
`;

const winRateLabel = css`
  font-size: 11px;
  display: flex;
  align-items: center;
  margin-left: 6px;
  padding-top: 3px;
`;
// id
// name
// points
// rank
// region
// games
// wins

export default ({ payload }) => {
  let winPercent;

  if (payload) {
    winPercent = (payload.wins / payload.games) * 100;
  }

  return (
    <div className={playerWrap}>
      <div className={position}>
        <SkeletonWrapper width={30}>{() => payload.rank}</SkeletonWrapper>
      </div>

      <div className={info}>
        <div>
          <SkeletonWrapper width={100}>
            {() => [
              <i key="tier" className={`vg-rank-${payload.tier}`} />,
              payload.name
            ]}
          </SkeletonWrapper>
        </div>
        <div style={{ padding: "1px" }}>
          <div className={winRateBar}>
            <div style={{ width: `${winPercent}%` }} />
          </div>
          <div className={winRateLabel}>
            {Math.floor(winPercent) || 0}% W/R
          </div>
        </div>
      </div>
      <div className={games}>
        <div>
          <SkeletonWrapper width={30}>
            {() => payload.games}
          </SkeletonWrapper>
        </div>
        <span>GAMES</span>
      </div>

      <div className={points}>
        <div>
          <SkeletonWrapper width={30}>
            {() => payload.points}
          </SkeletonWrapper>
        </div>
        <span>POINTS</span>
      </div>
    </div>
  );
};
