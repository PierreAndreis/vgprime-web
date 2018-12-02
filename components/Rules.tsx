import * as React from "react";
import { css } from "emotion";
import Modal from "./common/Modal";

import rulesContent from "./rulesContent";
import Markdown from "./common/MarkdownContent";

const content = css`
  height: auto;
  & header > div {
    width: 180px;
    height: 60px;

    background: url("/static/images/logo.png") no-repeat;
    background-size: contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  & header > h1 {
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 20px;
    border-bottom: 2px solid #4a90e7;
  }
  & header > .closeButton {
    font-size: 42px;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 10px;
    top: 0px;
    cursor: pointer;
  }

  & section {
    padding: 15px;
    letter-spacing: 1.5;
  }
`;

type Props = {
  open: boolean;
  closeAction: () => void;
};
class Rules extends React.Component<Props> {
  close = () => {
    this.props.closeAction();
  };

  render() {
    const { open } = this.props;
    return (
      <Modal open={open} onClose={this.close}>
        <div className={content}>
          <header style={{ position: "sticky" }}>
            <div />
            <h1>Rules</h1>
          </header>
          <section>
            <Markdown source={rulesContent} />
          </section>
        </div>
      </Modal>
    );
  }
}

export default Rules;
