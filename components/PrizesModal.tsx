import * as React from "react";
import Modal from "./common/Modal";
import { css } from "emotion";

const modalContainer = css`
  padding: 20px;
  & > header {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    & > h3 {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 16px;
    }
    & > .season {
      margin-left: auto;
      font-weight: 600;
    }
  }
`;

const PrizesModal: React.SFC = () => (
  <Modal onClose={() => {}} open={true}>
    <div className={modalContainer}>
      <header>
        <h3>Prizes</h3>
        <span className="season">Dec 1st - 30th</span>
      </header>
    </div>
  </Modal>
);

export default PrizesModal;
