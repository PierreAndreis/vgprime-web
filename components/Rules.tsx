import * as React from "react";
import { css } from "emotion";
import Modal from "./common/Modal";

import rulesContent from "./md/rulesContent";
import Markdown from "./common/MarkdownContent";

const content = css`
  padding: 15px;
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
          <Markdown source={rulesContent} />
        </div>
      </Modal>
    );
  }
}

export default Rules;
