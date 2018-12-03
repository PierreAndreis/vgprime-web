import * as React from "react";
import { css } from "emotion";

// @ts-ignore
import Media from "react-media";

// @ts-ignore
import { Link } from "../../routes";
import Rules from "../Rules";
import Search from "../Search";
import Box from "./Box";
import Portal from "./Portal";
import Button from "./Button";

const container = css`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template:
    "header header" auto
    "content sidebar" auto
    "content sidebar" 1fr
    "footer footer" 50px
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
  }

  & > .content {
    padding: 10px;
    width: 100%;
    grid-area: content;
    order: 1;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    max-width: 380px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width: 100%;
    padding: 15px 5px;
    margin: 0;
    flex-direction: column;
  }

  & .left {
    display: flex;
    margin-right: auto;
  }

  & .right {
    display: flex;
    width: 350px;
    height: 40px;
    align-self: center;
    margin-left: auto;
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
  margin-right: 15px;
  height: 40px;
  align-self: center;
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

const sidebarMobileCss = css`
  & > h4 {
    ${Box}
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 21px;
    height: 45px;
    border-radius: 0;
    margin-bottom: 10px;
  }

  & > .close {
    display: block;
    position: absolute;
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
  height: 100%;
  width: 400px;
  max-width: 100%;
  top: 0;
  left: 0;
`;

const footer = css`
  width: 100%;
  grid-area: footer;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > a {
    padding: 10px;
  }
`;

type State = {
  rulesOpened: boolean;
};

class SidebarMobile extends React.Component<
  { children: React.ReactNode },
  { open: boolean }
> {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

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
        <div style={{ margin: "10px" }}>
          <Button onClick={this.handleOpen}>Open Leaderboard</Button>
        </div>
      </>
    );
  }
}

export const Sidebar: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="sidebar">
    <Media query={{ maxWidth: 800 }} defaultMatches={false}>
      {(matches: boolean) =>
        !matches ? children : <SidebarMobile>{children}</SidebarMobile>
      }
    </Media>
  </div>
);

export const Content: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="content">{children}</div>
);

class Layout extends React.Component<{}, State> {
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
          <div className="left">
            <Link href="/" prefetch>
              <a>
                <div className={logo} />
              </a>
            </Link>
            <button className={rulesButton} onClick={this.openRulesModal}>
              Rules
            </button>
          </div>
          <div className="right">
            <div style={{ flex: 1 }}>
              <Search />
            </div>
          </div>
        </div>

        <Rules open={this.state.rulesOpened} closeAction={this.closeRulesModal} />

        {this.props.children}

        <div className={footer}>
          <Link href="/privacy-policy">
            <a>Privacy Policy</a>
          </Link>
          <Link href="/user-terms">
            <a>Terms and Conditions</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Layout;
