import * as React from "react";
import { css } from "emotion";

// @ts-ignore
import { Link } from "../../routes";
import Rules from "../Rules";
import Search from "../Search";
import Box from "./Box";
import Portal from "./Portal";
import FAQ from "../FAQ";
import Ads from "./Adsense";

const container = css`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template:
    "header header" auto
    "ads sidebar" 80px
    "content sidebar" auto
    "content sidebar" 1fr
    "footer footer" 50px
    "adsBottom adsBottom" 80px
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
    & > .visibleOnMobile {
      display: none;
      @media screen and (max-width: 800px) {
        display: block;
      }
    }
    & > .invisibleOnMobile {
      display: block;
      @media screen and (max-width: 800px) {
        display: none;
      }
    }
  }

  & > .content {
    padding: 10px;
    width: 100%;
    grid-area: content;
    order: 1;
    @media screen and (max-width: 800px) {
      padding-top: 0;
    }
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

    & > div.vgpro {
      align-self: center;
    }
    @media screen and (max-width: 800px) {
      justify-content: space-between;
      & > div.vgpro {
        position: absolute;
        right: 5px;
      }
    }
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
  background: #fff;
  width: 100%;
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

const vgproLink = css`
  border: 0;
  padding: 10px 15px;
  margin: 0 5px 2px;
  border-radius: 20px;
  background: linear-gradient(-90deg, rgb(251, 171, 126) 0%, rgb(247, 206, 104) 100%)
    rgb(230, 190, 61);
  box-shadow: rgb(230, 190, 61) 0px 0px 10px;
  border: none;
  color: #fff;
  transition: all 300ms;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  outline: 0;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: rgb(230, 190, 61) 0px 0px 10px;
    background: rgb(248, 204, 106);
  }
`;

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
        <div className={leaderboardCard} onClick={this.handleOpen}>
          <h5>Leaderboard</h5>
          <small>Click here to see the season's highscores</small>
        </div>
      </>
    );
  }
}

export const Sidebar: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="sidebar">
    <div className="invisibleOnMobile">{children}</div>
    <div className="visibleOnMobile">
      <SidebarMobile>{children}</SidebarMobile>
    </div>
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
            <div className="vgpro">
              <Link href="https://vgpro.gg/">
                <a className={vgproLink}>Back to VGPRO.gg</a>
              </Link>
            </div>
          </div>

          <div className="right">
            <div style={{ flex: 1 }}>
              <Search />
            </div>
          </div>
        </div>
        <div
          style={{
            gridArea: "ads",
            width: "100%",
            //order: 1,
          }}
        >
          <Ads />
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
        <div style={{ gridArea: "adsBottom", width: "100%", order: 4 }}>
          <Ads />
        </div>
      </div>
    );
  }
}

export default Layout;
