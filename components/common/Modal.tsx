import React, { ReactNode } from "react";
import { css } from "react-emotion";
import { Transition, animated } from "react-spring";

import Box from "./Box";
import Portal from "./Portal";

const modal = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const backdrop = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const modalContent = css`
  ${Box};
  width: 100%;
  height: auto;
  max-height: 90%;
  max-width: 800px;
  padding-bottom: 20px;

  @media screen and (max-width: 500px) {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
`;

type Props = {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
};

class Modal extends React.Component<Props> {
  onClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Portal>
        <Transition
          native
          // @ts-ignore
          items={this.props.open}
          from={{ opacity: 0, transform: "scale(0.95) translateY(-30px)" }}
          enter={{ opacity: 1, transform: "scale(1) translateY(0)" }}
          leave={{ opacity: 0, transform: "scale(0.95) translateY(-30px)" }}
          config={{
            duration: 200,
            tension: 0.1,
          }}
        >
          {open =>
            open &&
            ((styles: any) => (
              <div className={modal}>
                <animated.div
                  className={backdrop}
                  style={{ opacity: styles.opacity }}
                  onClick={this.onClose}
                />
                <animated.div className={modalContent} style={styles}>
                  {this.props.children}
                </animated.div>
              </div>
            ))
          }
        </Transition>
      </Portal>
    );
  }
}

export default Modal;
