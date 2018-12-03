import * as React from "react";
import { css } from "emotion";
import Box from "../common/Box";
import Link from "next/link";

const container = css`
  ${Box};
  width: 100%;
  background-image: url("https://brokenmyth.net/wp-content/uploads/vgprime.jpg");
  background-size: 0;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin: 10px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  & h2 {
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    & small {
      display: block;
      margin: 0;
      font-size: 24px;
    }
  }

  p {
    font-size: 14px;
    margin: 20px 0 0 0;
  }

  & img {
    display: inline-block;
    max-width: 100%;
  }
`;

const BrokenMyth: React.SFC = () => (
  <div className={container}>
    <Link href="https://brokenmyth.net/exclusive-introducing-vgprime/">
      <a target={"_blank"}>
        <img src="https://brokenmyth.net/wp-content/uploads/vgprime.jpg" />
      </a>
    </Link>
  </div>
);

export default BrokenMyth;
