import React from "react";
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
  width: 95%;
  height: auto;
  max-height: 90%;
  max-width: 800px;
  padding-bottom: 20px;
  overflow-x: auto;
  border-radius: 10px;

  @media screen and (max-width: 500px) {
    width: 80%;
    max-width: 100%;
    height: 80%;
    max-height: 100%;
    border-radius: 0;
    border-radius: 10px;
  }
`;

const modalClose = css`
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;

  :hover,
  :focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
`;

type Props = {
  onClose: () => void;
  open: boolean;
  maxWidth?: number;
};

class Modal extends React.Component<Props> {
  static defaultProps = {
    maxWidth: 800,
  };
  onClose = () => {
    this.props.onClose();
  };

  modalRef = React.createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: Props) {
    if (this.props.open && !prevProps.open) {
      document.body.style.overflow = "hidden";
    }

    if (!this.props.open && prevProps.open) {
      document.body.style.overflow = "auto";
    }
  }

  focusIfVisible = () => {
    this.modalRef.current && this.modalRef.current.focus();
  };

  render() {
    const maxContentWidth = this.props.maxWidth;
    return (
      <Portal>
        {/* 
      // @ts-ignore */}
        <Transition
          native
          items={this.props.open}
          from={{
            backdropOpacity: 0,
            opacity: 0,
            transform: "translateY(30px)",
          }}
          enter={[
            { backdropOpacity: 0.8 },
            { backdropOpacity: 1, opacity: 1, transform: "translateY(0)" },
          ]}
          leave={[
            {
              opacity: 0,
              transform: "translateY(-30px)",
            },
            {
              backdropOpacity: 0,
            },
          ]}
          config={{
            duration: 200,
            tension: 0.1,
          }}
          // @ts-ignore
          onRest={this.focusIfVisible}
        >
          {open =>
            open &&
            (styles => (
              <animated.div className={modal}>
                <animated.div
                  className={backdrop}
                  style={{ opacity: styles.backdropOpacity }}
                  onClick={this.onClose}
                />
                <span className={modalClose} onClick={this.onClose}>
                  &times;
                </span>
                <animated.div
                  className={modalContent}
                  style={{
                    opacity: styles.opacity,
                    transform: styles.transform,
                    maxWidth: maxContentWidth,
                  }}
                >
                  <div ref={this.modalRef} tabIndex={-1} style={{ outline: 0 }}>
                    {this.props.children}
                  </div>
                </animated.div>
              </animated.div>
            ))
          }
        </Transition>
      </Portal>
    );
  }
}

export default Modal;
