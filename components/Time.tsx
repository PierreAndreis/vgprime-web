import * as React from "react";
import { css } from "emotion";
import Box from "./common/Box";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const qPrimeHours = gql`
  query PrimeHours {
    primeHours {
      name
      start
      end
      live
    }
  }
`;

type PrimeHour = {
  name: string;
  start: string;
  end: string;
  live: boolean;
};

type PrimeHoursList = [PrimeHour];

// .toLocaleTimeString doesn't support the second argument in some browsers
function displayNiceTime(date: Date) {
  return date.toLocaleTimeString([], {
    minute: "2-digit",
    hour12: false,
    hour: "2-digit",
  });
}

const container = css`
  ${Box};
  width: 100%;
  background-image: linear-gradient(-135deg, #84aff5 0%, #91dde9 100%);
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin: 10px;
  height: 150px;
  & h2 {
    margin: 5px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding-right: 15px;
    position: relative;
    & span {
      position: absolute;
      right: -2px;
      top: -9px;

      & svg {
        font-size: 5px;
        width: 15px;
        height: 15px;
        margin-top: 10px;
      }
    }
  }
`;

const hours = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  & > div {
    display: flex;
    justify-content: center;
    padding: 2px;
    font-size: 12px;
    position: relative;
    &:nth-child(even) {
      background: rgba(0, 0, 0, 0.03);
    }

    &:first-of-type {
      color: rgba(0, 0, 0, 0.4);
      font-size: 11px;
      .region {
        font-weight: normal;
      }
    }
    & > div {
      margin: 0 5px;
    }

    .region {
      width: 50px;
      text-transform: uppercase;
      padding-left: 20px;
      font-weight: bold;
    }
    .start {
      width: 45px;
      text-align: right;
    }
    .end {
      width: 45px;
      text-align: right;
    }

    .live {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 10px;
      font-weight: bold;
      padding: 3px;
      color: rgba(255, 255, 255, 0.4);
    }
    &.active .live {
      animation: blink 3s infinite;
      color: white;
    }

    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    &.active {
      background-image: linear-gradient(
        to right,
        rgba(152, 251, 152, 0.7),
        transparent,
        transparent,
        transparent
      );
    }
  }
`;

export default class extends React.Component<{}> {
  render() {
    return (
      <div className={container}>
        <h2>
          PRIME HOURS{" "}
          {/* <span>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M11,17H13V11H11V17Z" />
            </svg>
          </span> */}
        </h2>
        <Query query={qPrimeHours}>
          {({ data, loading }) => {
            const primeHours = data.primeHours as PrimeHoursList;

            if (loading) {
              return <div>Loading</div>;
            }

            primeHours.sort((a, b) => (a.name > b.name ? 1 : -1));

            return (
              <div className={hours}>
                <div>
                  <div className="region">REGION</div>
                  <div className="start">START</div>
                  <div className="end">END</div>
                </div>
                {primeHours.map(prime => (
                  <div key={prime.name} className={prime.live ? "active" : ""}>
                    {prime.live && <div className="live">ONLINE</div>}
                    {!prime.live && <div className="live">OFFLINE</div>}
                    <div className="region">
                      {prime.name === "sg" ? "SEA" : prime.name}
                    </div>
                    <div className="start">{displayNiceTime(new Date(prime.start))}</div>
                    <div className="end">{displayNiceTime(new Date(prime.end))}</div>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
