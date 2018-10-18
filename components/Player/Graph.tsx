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
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipPayload,
  TickFormatterFunction,
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
  return (
    <div className={graphBox}>
      <SkeletonContext.Consumer>
        {loading => {
          if (loading === "loading")
            return <LoadingIcon className={loaderStyle} loading={true} />;
          return (
            <ResponsiveContainer minHeight="230px" width="100%">
              <LineChart data={data} syncId="date">
                <Line dataKey={dataKey} />
                <XAxis dataKey="date" />
                <YAxis reversed={dataKey === "rank"} />
                <Tooltip content={<CustomTooltip title={title} />} />
                <Legend />
                <CartesianGrid stroke="#ccc" />
              </LineChart>
            </ResponsiveContainer>
          );
        }}
      </SkeletonContext.Consumer>
    </div>
  );
};

export default Graph;
