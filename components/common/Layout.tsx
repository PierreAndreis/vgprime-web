import * as React from "react";
import { css } from "emotion";
import Articles from "../Articles/Articles";

import Link from "next/link";
import Rules from "../Rules";
import Cookies from "js-cookie";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const rulesModalValue = publicRuntimeConfig.rulesModalValue;

const container = css`
  width: auto;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  display: grid;
  grid-template:
    "header header" auto
    "articles sidebar" auto
    "content sidebar" 1fr
    / 1fr 360px;
  grid-column-gap: 10px;

  & h4 {
    font-size: 17px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 1300px) {
    display: grid;
    grid-template:
      "header header" auto
      "sidebar articles" auto
      "sidebar content" auto
      / 360px 1fr;
  }

  @media screen and (max-width: 800px) {
    width: 380px;
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
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 2%;
`;

const logo = css`
  width: 180px;
  height: 60px;

  background: url("/static/images/logo.png") no-repeat;
  background-size: contain;

  color: #7aaeff;
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
  border: 1px solid #7aaeff;
  border-radius: 30px;
  padding: 0px 15px;
  color: #7aaeff;
  text-transform: uppercase;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background: #7aaeff;
    color: #fff;
  }
`;

const sidebar = css`
  grid-area: sidebar;
  order: 2;
`;

const articles = css`
  grid-area: articles;
  position: relative;
  order: 1;
`;

const content = css`
  grid-area: content;
  order: 3;
`;

type State = {
  rulesOpened: boolean;
};

class Layout extends React.Component<{}, State> {
  static Sidebar: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={sidebar}>{children}</div>
  );
  static Content: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={content}>{children}</div>
  );

  state = {
    rulesOpened: false,
  };

  componentDidMount() {
    if (typeof document !== "undefined") {
      const rulesDate = Cookies.get("rulesModal");
      if (!rulesDate || rulesDate !== rulesModalValue) {
        Cookies.set("rulesModal", rulesModalValue);
        this.setState({ rulesOpened: true });
        return;
      }
    }
  }

  openRulesModal = () => {
    document.body.style.overflow = "hidden";
    this.setState({ rulesOpened: true });
  };
  closeRulesModal = () => {
    document.body.style.overflow = "auto";
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
        <div className={articles}>
          <h4>Articles</h4>
          <Articles />
        </div>
        <Rules open={this.state.rulesOpened} closeAction={this.closeRulesModal} />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
