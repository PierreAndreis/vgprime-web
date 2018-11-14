import * as React from "react";
import { css } from "emotion";

import Link from "next/link";
import Rules from "../Rules";
import Cookies from "js-cookie";

import getConfig from "next/config";
import NavBar, { Page } from "./NavBar";
import SvgHome from "./SvgHouse";
import SvgGame from "./SvgGames";
import SvgLeaderboard from "./SvgRank";

const { publicRuntimeConfig } = getConfig();

const rulesModalValue = publicRuntimeConfig.rulesModalValue;

const container = (currentPage: Page) => css`
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
    font-size: 16px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 800;
    margin-left: 5px;
    margin-bottom: 15px;
    margin-top: 15px;
  }

   & > .sidebar {
    box-sizing: border-box;
    grid-area: sidebar;
    order: 2;
    @media screen and (max-width: 550px) {
      ${currentPage !== "Leaderboard" ? "display: none;" : "display: block;"}
    padding-bottom: 100px;
    }
  }

  & > .content {
    box-sizing: border-box;
    grid-area: content;
    order: 3;
    @media screen and (max-width: 550px) {
      ${currentPage !== "Content" ? "display: none;" : "display: block;"}
    }
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
    width: 100%;
    max-width: 380px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 500px) {
  }
`;

const header = css`
  grid-area: header;
  order: 0;

  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-top: 5%;
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

  color: #4A90E7;
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
  border: 1px solid #4A90E7;
  border-radius: 30px;
  padding: 0px 15px;
  color: #4A90E7;
  text-transform: uppercase;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background: #4A90E7;
    color: #fff;
  }
`;

type State = {
  rulesOpened: boolean;
  page: Page;
};

class Layout extends React.Component<{}, State> {
  static Sidebar: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="sidebar">{children}</div>
  );
  static Content: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="content">{children}</div>
  );

  state = {
    rulesOpened: false,
    page: "Main" as Page,
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
    this.setState({ rulesOpened: true });
  };
  closeRulesModal = () => {
    this.setState({ rulesOpened: false });
  };

  render() {
    console.log(this.state.page);
    return (
      <div className={container(this.state.page)}>
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
        <NavBar
          changeHandler={newPage => this.setState({ page: newPage })}
          page={this.state.page}
        >
          <NavBar.Tab title="Leaderboard">
            <p> <SvgLeaderboard active={this.state.page === "Leaderboard"}></SvgLeaderboard></p>
          </NavBar.Tab>
          <NavBar.Tab title="Main">
            <p> <SvgHome active={this.state.page === "Main"}></SvgHome></p>
          </NavBar.Tab>
          <NavBar.Tab title="Content">
            <p> <SvgGame active={this.state.page === "Content"}></SvgGame></p>
          </NavBar.Tab>
        </NavBar>
      </div>
    );
  }
}

export default Layout;
