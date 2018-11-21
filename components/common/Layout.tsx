import * as React from "react";
import { css } from "emotion";

import Link from "next/link";
import Rules from "../Rules";

const container = css`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template:
    "header header" auto
    "content sidebar" auto
    "content sidebar" 1fr
    / 1fr 360px;
  grid-column-gap: 10px;

  & h4 {
    font-size: 16px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 800;
    margin-left: 5px;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  & > .sidebar {
    grid-area: sidebar;
    order: 2;
  }

  & > .content {
    width: 100%;
    grid-area: content;
    order: 1;
  }

  @media screen and (max-width: 1300px) {
    display: grid;
    grid-template:
      "header header" auto
      "sidebar content" auto
      "sidebar content" auto
      / 360px 1fr;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 380px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 550px) {
    padding-bottom: 80px;
  }
`;

const header = css`
  grid-area: header;
  order: 0;

  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-top: 20px;
  @media screen and (max-width: 800px) {
    width: 90%;
    align-items: center;
  }
`;

const logo = css`
  width: 180px;
  height: 50px;

  background: url("/static/images/logo.png") no-repeat;
  background-size: contain;

  color: #4a90e7;
  font-weight: bold;
  font-size: 35px;

  cursor: pointer;

  & > b {
    color: black;
  }
`;

const rulesButton = css`
  margin-left: auto;
  align-self: center;
  height: 40px;
  background: #fff;
  justify-self: center;
  border: 1px solid #4a90e7;
  border-radius: 30px;
  padding: 0px 15px;
  color: #4a90e7;
  text-transform: uppercase;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background: #4a90e7;
    color: #fff;
  }
`;

type State = {
  rulesOpened: boolean;
};

class Layout extends React.Component<{}, State> {
  static Sidebar: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="sidebar">{children}</div>
  );
  static Content: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="content">{children}</div>
  );
  static Main: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="main">{children}</div>
  );

  state = {
    rulesOpened: false,
  };

  openRulesModal = () => {
    this.setState({ rulesOpened: true });
  };
  closeRulesModal = () => {
    this.setState({ rulesOpened: false });
  };

  render() {
    return (
      <div className={container}>
        <div className={header}>
          <Link href="/" prefetch>
            <a>
              <div className={logo} />
            </a>
          </Link>
          <button className={rulesButton} onClick={this.openRulesModal}>
            Rules
          </button>
        </div>
        <Rules open={this.state.rulesOpened} closeAction={this.closeRulesModal} />

        {this.props.children}
      </div>
    );
  }
}

export default Layout;
