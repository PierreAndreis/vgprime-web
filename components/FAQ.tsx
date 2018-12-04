import * as React from "react";
import { css } from "emotion";
import Modal from "./common/Modal";

import Markdown from "./common/MarkdownContent";
import TrackingComponent from "../lib/tracking";
import faqContent from "./md/faqContent";

const content = css`
  padding: 15px;
`;

type Props = {
  open: boolean;
  closeAction: () => void;
};
class FAQ extends React.Component<Props> {
  close = () => {
    this.props.closeAction();
  };

  render() {
    const { open } = this.props;
    return (
      <Modal open={open} onClose={this.close}>
        <div className={content}>
          <TrackingComponent name="FAQ" />
          <Markdown source={faqContent} />
        </div>
      </Modal>
    );
  }
}

export default FAQ;
