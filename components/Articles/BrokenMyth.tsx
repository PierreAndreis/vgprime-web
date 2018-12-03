import * as React from "react";
import { css } from "emotion";
import Box from "../common/Box";
import Link from "next/link";

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
  cursor: pointer;
  & img {
    display: inline-block;
    max-width: 30%;
  }
  & h2 {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    //margin-bottom: 30px;
    & small {
      display: block;
      margin: 0;
      font-size: 24px;
    }
  }

  p {
    position: absolute;
    bottom: 15px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    text-transform: uppercase;
    & > img {
      display: inline-block;
      width: 25px;
      height: 25px;
      margin-bottom: -5px;
    }
  }
`;

const BrokenMyth: React.SFC = () => (
  <Link href="https://brokenmyth.net/exclusive-introducing-vgprime/">
    <a target="_blank" className={container}>
      <h2>How to play</h2>
      <p>
        Explained by <img src="/static/images/logo_brokenmyth.png" />
      </p>
    </a>
  </Link>
);

export default BrokenMyth;
