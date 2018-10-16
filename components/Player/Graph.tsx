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
import { SkeletonWrapper } from '../common/Skeleton';

type Props = {
  player?: Player;
  dataKey: string;
}

const graphBox = css`
  ${Box};
  padding: 20px;
  padding-left: 0px;
  min-height: 250px;
`;

const tooltipBox = css`
  ${Box};
  padding: 20px;
  .label {
    padding-bottom: 10px;
  }
  .label, .intro {
    font-weight: 300;
    b {
      font-weight: 500;
    }
  }
`;

// type TooltipProps = {
//   type?: string;
//   payload?: any[];
//   label?: string;
// }
const CustomTooltip: React.SFC<any> = ({active, payload, label}) => {
  if (active) {
    const date = new Date(label).toLocaleDateString();
    const info = payload[0].dataKey === 'rank' ? 'Rank'
      : payload[0].dataKey === 'points' ? 'Points'
      : 'Value'
    return (
      <div className={`custom-tooltip ${tooltipBox}`}>
        {
        //<p className='label'><b>Date:</b> {date}</p>
        }
        <p className='intro'><b>{info}:</b> {payload[0].value}</p>
      </div>
    );
  } else {
    return (<div>Lol</div>)
  }
};

const Graph: React.SFC<Props> = ({ player, dataKey }) => {
  const historical = player ? Object.values(player.historical).map((val: any) => {
    return val;
  })
  : [];
  
  return (
    <div className={graphBox}>
      <SkeletonWrapper>
      {() => 
        <ResponsiveContainer minHeight="230px" width='100%'>
          <LineChart data={historical} syncId='date'>
            <Line dataKey={dataKey}></Line>
            <XAxis dataKey='date' tickFormatter={t => {
              return new Date(t).toLocaleDateString()
            }}></XAxis>
            <YAxis reversed={dataKey === 'rank'}></YAxis>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
      }
      </SkeletonWrapper>
    </div>
  );
};

export default Graph;
