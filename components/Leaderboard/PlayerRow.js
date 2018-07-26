import { css } from "emotion";

const playerWrap = css`
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
  margin-bottom: 5px;

  height: 50px;

  display: flex;
  align-items: center;
  color: white;

  border-sizing: border-box;
`;

const position = css`
  width: 40px;
  text-align: right;
  padding-right: 30px;
  border-sizing: border-box;

  font-size: 16px;
  font-weight: bold;
  color: #4a90e2;
`;

const info = css`
  width: 150px;
  font-size: 18px;

  font-family: "Roboto Condensed";
  font-weight: 700;
  color: rgb(231, 231, 231);
`;

const points = css`
  width: 100px;
  font-size: 21px;
  text-align: center;
  margin-left: auto;
`;

// id
// name
// points
// rank
// region
// games
// wins

export default ({ payload }) => (
  <div className={playerWrap}>
    <div className={position}>{payload.rank}</div>

    <div className={info}>{payload.name}</div>

    <div className={points}>{payload.points}</div>
  </div>
);
