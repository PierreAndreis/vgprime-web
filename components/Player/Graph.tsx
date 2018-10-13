import * as React from 'react';
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
} from "recharts";

type Props = {
  player: Player;
}



const Graph: React.SFC<Props> = ({ player }) => {
  console.log('player', player);
  const historical = Object.values(player.historical).map((val: any) => {
    return val;
  });
  console.log(historical);
  return (
    <div className={Box}>
        <LineChart width={100} height={100} data={historical}>
          <Line dataKey='rank'></Line>
          <XAxis dataKey='date' tickFormatter={(i) => {
            const date = Date.parse(i);
            return date.toLocaleString();
          }}></XAxis>
          <YAxis></YAxis>
          <CartesianGrid stroke="#ccc" />
        </LineChart>
    </div>
  )
};

export default Graph;