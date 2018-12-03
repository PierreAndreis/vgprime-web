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
import FAQ from "../FAQ";

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
  ${Box};
  flex-direction: row;
  order: 4;
  width: 100%;
  grid-area: footer;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
  font-size: 12px;
  a {
    padding: 10px;
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

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

type State = {
  rulesOpened: boolean;
  faqOpened: boolean;
};
class Layout extends React.Component<{}, State> {
  state = {
    rulesOpened: false,
    faqOpened: false,
  };

  openRulesModal = () => {
    this.setState({ rulesOpened: true });
  };
  closeRulesModal = () => {
    this.setState({ rulesOpened: false });
  };

  openFaqModal = () => {
    this.setState({ faqOpened: true });
  };
  closeFaqModal = () => {
    this.setState({ faqOpened: false });
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
          </div>
          <div className="right">
            <div style={{ flex: 1 }}>
              <Search />
            </div>
          </div>
        </div>

        <Rules open={this.state.rulesOpened} closeAction={this.closeRulesModal} />
        <FAQ open={this.state.faqOpened} closeAction={this.closeFaqModal} />
        {this.props.children}

        <div className={footer}>
          <div>
            VGPRIME is not affiliated or part of Super Evil Megacorp or Vainglory. Made by{" "}
            <a href="https://vgpro.gg" target="_blank" style={{ padding: 0 }}>
              VGPRO.gg
            </a>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <a onClick={this.openFaqModal} style={{ cursor: "pointer" }}>
              Frequently Asked Questions
            </a>
            <a onClick={this.openRulesModal} style={{ cursor: "pointer" }}>
              Rules
            </a>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/user-terms">
              <a>Terms and Conditions</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
