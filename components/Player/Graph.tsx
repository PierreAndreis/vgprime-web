import * as React from "react";
import { css } from "emotion";
import { Player } from "./../../graphql/leaderboard";
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
  TooltipPayload
} from "recharts";
import { SkeletonWrapper } from "../common/Skeleton";

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
  .label,
  .intro {
    font-weight: 300;
    b {
      font-weight: 500;
    }
  }
`;

type TooltipProps = {
  type?: string;
  payload?: TooltipPayload[];
  label?: string;
  active?: boolean;
  title: string;
};
const CustomTooltip: React.SFC<TooltipProps> = ({
  active,
  payload,
  label,
  title
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  console.log("payload", payload);
  return (
    <div className={`custom-tooltip ${tooltipBox}`}>
      {
        //<p className='label'><b>Date:</b> {date}</p>
      }
      <p className="intro">
        <b>{title}:</b> {payload[0].value}
      </p>
    </div>
  );
};

type Props = {
  player?: Player;
  dataKey: string;
  title: string;
};
const Graph: React.SFC<Props> = ({ player, dataKey, title }) => {
  const historical = player
    ? Object.values(player.historical).map((val: any) => {
        return val;
      })
    : [];

  return (
    <div className={graphBox}>
      <SkeletonWrapper>
        {() => (
          <ResponsiveContainer minHeight="230px" width="100%">
            <LineChart data={historical} syncId="date">
              <Line dataKey={dataKey} />
              <XAxis
                dataKey="date"
                tickFormatter={t => {
                  return new Date(t).toLocaleDateString();
                }}
              />
              <YAxis reversed={dataKey === "rank"} />
              <Tooltip content={<CustomTooltip title={title} />} />
              <Legend />
              <CartesianGrid stroke="#ccc" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </SkeletonWrapper>
    </div>
  );
};

export default Graph;
