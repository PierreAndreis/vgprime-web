import * as React from 'react';
import {css} from 'emotion';
import { Player } from './../../graphql/leaderboard';
import Box from "./../common/Box";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  player: Player;
  dataKey: string;
}

const graphBox = css`
  ${Box};
  padding: 20px;
  min-height: 250px;
`;


const Graph: React.SFC<Props> = ({ player, dataKey }) => {
  const historical = Object.values(player.historical).map((val: any) => {
    return val;
  });
  console.log(historical);
  return (
    <div className={graphBox}>
      <ResponsiveContainer minHeight="230px" width='100%'>
        <LineChart data={historical}>
          <Line dataKey={dataKey}></Line>
          <XAxis dataKey='date' tickFormatter={t => {
            return new Date(t).toLocaleDateString()
          }}></XAxis>
          <YAxis></YAxis>
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke="#ccc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Graph;