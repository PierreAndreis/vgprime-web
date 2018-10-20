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
import { Historical } from "./Player";

const loaderStyle = css``;

const graphBox = css`
  ${Box};
  padding: 20px;
  min-height: 250px;
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
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
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

  const strDate = payload[0].payload.date;
  return (
    <div className={`custom-tooltip ${tooltipBox}`}>
      {
        <p className="label">
          <b>Date:</b> {strDate}
        </p>
      }
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

const Graph: React.SFC<Props> = ({ data, dataKey, title }) => {
  console.log(data);
  console.log(dataKey);
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
                <div>Please play more</div>
              </div>
            );
          return (
            <ResponsiveContainer minHeight="230px" width="100%">
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
                  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                  </filter>
                </defs>
                <CartesianGrid
                  fill="none"
                  //stroke="rgba(104, 104, 104, 0.2)"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  strokeWidth={3}
                  //filter={"url(#blur)"}
                  stroke="#fff"
                  dot={true}
                />
                <XAxis
                  dataKey="date"
                  stroke="#fff"
                  padding={{ left: 30, right: 30 }}
                  height={20}
                  tick={{ fontSize: "10px" }}
                  interval={0}
                  allowDecimals={false}
                  tickLine={false}
                />
                <YAxis
                  reversed={dataKey === "rank"}
                  stroke="#fff"
                  padding={{ top: 0, bottom: 0 }}
                  scale="auto"
                  width={40}
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
