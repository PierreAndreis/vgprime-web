import * as React from "react";
import { css } from "emotion";
import Box from "./../common/Box";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipPayload,
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
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #adadad;
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
                    <stop offset="0%" stopColor="#7aaeff" stopOpacity={1} />
                    <stop offset="100%" stopColor="#74e1eb" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid fill="none" stroke="#dcdcdc" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  strokeWidth={3}
                  stroke="url(#blue)"
                  dot={true}
                />
                <XAxis
                  dataKey="time"
                  stroke="#213141"
                  padding={{ left: 30, right: 30 }}
                  height={10}
                  tick={{ fontSize: "10px" }}
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
                  stroke="#213141"
                  padding={{ top: 0, bottom: 0 }}
                  width={20}
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
