import * as React from "react";
import { css } from "emotion";
// import { Player } from "./../../graphql/leaderboard";
import Box from "./../common/Box";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  TooltipPayload,
  // TickFormatterFunction,
} from "recharts";
import { FadeLoader as LoadingIcon } from "react-spinners";
import { SkeletonContext } from "../common/Skeleton";
import { Historical } from "../../lib/historical";

const loaderStyle = css`
  opacity: 0.4;
`;

const graphBox = css`
  ${Box};
  padding: 20px;
  height: 130px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #82aef2;
  color: #fff;
  margin: 0;
`;

const errorMessage = css`
  color: #fff;
  text-align: center;
  font-weight: 400;
`;

const tooltipBox = css`
  ${Box};
  padding: 10px;
  font-size: 13px;
  color: #000;
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

interface CustomTooltipPayload extends TooltipPayload {
  payload: Historical;
}

type TooltipProps = {
  type?: string;
  payload?: CustomTooltipPayload[];
  label?: string;
  active?: boolean;
  title: string;
};
const CustomTooltip: React.SFC<TooltipProps> = ({ active, payload, title }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const strDate = payload[0].payload.date.toLocaleDateString();
  return (
    <div className={`custom-tooltip ${tooltipBox}`}>
      <p className="label">{strDate}</p>
      <p className="intro">
        <b>{title}:</b> {payload[0].value}
      </p>
    </div>
  );
};

type Props = {
  data?: Historical[];
  dataKey: string;
  title: string;
};

const formatXAxis = (tickItem: any): string => {
  return new Date(tickItem).toLocaleDateString();
};

const Graph: React.SFC<Props> = ({ data, dataKey, title }) => {
  return (
    <div className={graphBox}>
      <SkeletonContext.Consumer>
        {loading => {
          if (loading === "loading")
            return <LoadingIcon className={loaderStyle} loading={true} />;
          if (!data || data.length <= 1)
            return (
              <div className={errorMessage}>
                <div>We don't have enough data to build this chart.</div>
                <div>Please try again later.</div>
              </div>
            );
          return (
            <ResponsiveContainer height={100} width="100%">
              <LineChart data={data} syncId="date">
                <defs>
                  <linearGradient
                    id="blue"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="5%" stopColor="#51E1EC" stopOpacity={1} />
                    <stop offset="95%" stopColor="#3023AE" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="bluexpink"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="5%" stopColor="#4681BA" stopOpacity={1} />
                    <stop offset="95%" stopColor="#DB4EA1" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="orange"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="5%" stopColor="#F0CE78" stopOpacity={1} />
                    <stop offset="95%" stopColor="#EEAE85" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="red"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="5%" stopColor="#FF5D6B" stopOpacity={1} />
                    <stop offset="95%" stopColor="#B1041E" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  strokeWidth={2}
                  stroke="#fff"
                  dot={true}
                />
                <XAxis
                  dataKey="time"
                  stroke="#fff"
                  padding={{ left: 30, right: 30 }}
                  height={10}
                  tick={{ fontSize: "9px" }}
                  interval={0}
                  allowDecimals={true}
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  scale="time"
                  tickFormatter={formatXAxis}
                  tickCount={10}
                />
                <YAxis
                  reversed={dataKey === "rank"}
                  stroke="#fff"
                  padding={{ top: 0, bottom: 0 }}
                  //width={40}
                  allowDecimals={false}
                  tick={{ fontSize: "12px" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip title={title} />} />
              </LineChart>
            </ResponsiveContainer>
          );
        }}
      </SkeletonContext.Consumer>
    </div>
  );
};

export default Graph;
