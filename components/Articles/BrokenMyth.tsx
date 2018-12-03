import * as React from "react";
import { css } from "emotion";
import Box from "../common/Box";
import Link from "next/link";

const container = css`
  ${Box};
  width: 100%;
  background-image: linear-gradient(-135deg, #84aff5 0%, #91dde9 100%);
  //background: #fff;
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
  /* & h2 {
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    & small {
      display: block;
      margin: 0;
      font-size: 24px;
    }
  } */

  p {
    position: absolute;
    bottom: 15px;
    font-size: 18px;
    //color: #fff;
    font-weight: 600;
  }
`;

const BrokenMyth: React.SFC = () => (
  <Link href="https://brokenmyth.net/exclusive-introducing-vgprime/">
    <a target="_blank" className={container}>
      <img src="/static/images/logo_brokenmyth.png" />
      <p>How to play</p>
    </a>
  </Link>
);

export default BrokenMyth;
