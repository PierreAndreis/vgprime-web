import React from "react";
import Portal from "../common/Portal";
import { css } from "emotion";
import Box from "../common/Box";

const leaderboardCard = css`
  background-image: linear-gradient(-135deg, #84aff5 0%, #91dde9 100%);
  color: #fff;
  font-size: 32px;
  width: 250px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  & > h5 {
    position: absolute;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    align-self: center;
  }
  & > small {
    color: rgba(0, 0, 0, 0.3);
    width: 250px;
    font-size: 14px;
    text-align: center;
    margin-top: auto;
    margin-bottom: 10px;
  }
`;

const sidebarMobileCss = css`
  background: #fff;
  width: 100%;
  & > header {
    ${Box};
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    text-align: center;
    font-size: 21px;
    line-height: 2.2;
    border-radius: 0;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: center;
  }

  & > .close {
    display: block;
    position: fixed;
    font-size: 32px;
    color: black;
    z-index: 6;
    top: 5px;
    right: 15px;
    cursor: pointer;
    border-radius: 50%;
    padding: 2px 10px;
    transition: all 300ms;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 45px;
`;

type Props = {
  children: React.ReactNode;
};

type State = {
  open: boolean;
};

class LeaderboardMobile extends React.Component<Props, State> {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.open && !prevState.open) {
      document.body.style.overflow = "hidden";
    }

    if (!this.state.open && prevState.open) {
      document.body.style.overflow = "auto";
    }
  }

  render() {
    return (
      <>
        {this.state.open && (
          <Portal>
            <div className={sidebarMobileCss}>
              <div className="close" onClick={this.handleOpen}>
                &times;
              </div>
              {this.props.children}
            </div>
          </Portal>
        )}
        <div className={leaderboardCard} onClick={this.handleOpen}>
          <h5>Leaderboard</h5>
          <small>Click here to see the season's highscores</small>
        </div>
      </>
    );
  }
}
export default LeaderboardMobile;
