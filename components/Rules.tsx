import * as React from "react";
import { css } from "react-emotion";
import Box from "./common/Box";
import { buttonCss } from "./common/Button";

const modal = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  //padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const modalContent = css`
  ${Box};
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80%;
  height: 300px;
  z-index: 999;
  margin: 0 auto;
  & > header {
    text-align: center;
    & > .closeButton {
      font-size: 42px;
      padding: 0;
      margin: 0;
      position: absolute;
      right: 10px;
      top: 0px;
      cursor: pointer;
    }
  }
`;

type Props = {
  opened: boolean;
  closeAction: () => void;
};
const Rules: React.SFC<Props> = ({ opened, closeAction }) => {
  if (!opened) return null;
  return (
    <div className={modal}>
      <div className={modalContent}>
        <header>
          <span>Rules</span>
          <span className="closeButton" onClick={closeAction}>
            &times;
          </span>
        </header>
        <div>
          <p>Test rules</p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
