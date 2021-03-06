import * as React from "react";
import { css } from "emotion";

// @ts-ignore
import { Link } from "../../routes";
import Rules from "../Rules";
import Search from "../Search";
import Box from "./Box";
import FAQ from "../FAQ";
import Ads from "./Adsense";

const container = css`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template:
    "header header" auto
    "ads sidebar" auto
    "content sidebar" auto
    "content sidebar" 1fr
    "footer footer" 50px
    "adsBottom adsBottom" auto
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

export const Sidebar: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="sidebar">{children}</div>
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
