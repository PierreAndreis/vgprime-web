import * as React from "react";
import { css } from "emotion";

import Link from "next/link";
import Rules from "../Rules";
import Cookies from "js-cookie";

import getConfig from "next/config";
import NavBar, { Page } from "./NavBar";
import { Label } from "recharts";

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
    "main sidebar" auto
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

  & > .sidebar {
    box-sizing: border-box;
    grid-area: sidebar;
    order: 2;
    @media screen and (max-width: 550px) {
      ${currentPage !== "sidebar" ? "display: none;" : "display: block;"}
    }
  }

  & > .main {
    box-sizing: border-box;
    width: 100%;
    grid-area: main;
    order: 1;
    @media screen and (max-width: 550px) {
      ${currentPage !== "main" ? "display: none;" : "display: block;"}
    }
  }

  & > .content {
    box-sizing: border-box;
    grid-area: content;
    order: 3;
    @media screen and (max-width: 550px) {
      ${currentPage !== "content" ? "display: none;" : "display: block;"}
    }
  }

  @media screen and (max-width: 1300px) {
    display: grid;
    grid-template:
      "header header" auto
      "sidebar main" auto
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
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 2%;
`;

const logo = css`
  width: 300px;
  max-width: 180px;
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

type State = {
  rulesOpened: boolean;
  page: Page;
};

type SectionProps = {
  children: React.ReactNode;
  tabContent: React.ReactNode;
  area: "sidebar" | "main" | "content";
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
  static Section: React.SFC<SectionProps> = ({ children, area }) => (
    <div className={area}>{children}</div>
  );

  state = {
    rulesOpened: false,
    page: "main",
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
    const children = React.Children.toArray(this.props.children);
    const navTabs: Array<React.ReactElement<any>> = [];
    const sections: Array<React.ReactElement<SectionProps>> = children
      .filter(
        child =>
          React.isValidElement(child) &&
          (child as React.ReactElement<any>).type === Layout.Section
      )
      .map((section, key) => {
        const casted = section as React.ReactElement<SectionProps>;
        return React.cloneElement(casted, { key: `section${key}${casted.props.area}` });
      });
    sections.forEach((section, key) => {
      navTabs.push(
        <NavBar.Tab key={`navTab${key}${section.props.area}`} title={section.props.area}>
          {section.props.tabContent}
        </NavBar.Tab>
      );
    });
    // const sideBar = children.find(
    //   x =>
    //     React.isValidElement(x) && (x as React.ReactElement<any>).type === Layout.Sidebar
    // );
    // const content = children.find(
    //   x =>
    //     React.isValidElement(x) && (x as React.ReactElement<any>).type === Layout.Content
    // );
    // const main = children.find(
    //   x => React.isValidElement(x) && (x as React.ReactElement<any>).type === Layout.Main
    // );
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

        {sections}

        <NavBar
          changeHandler={newPage => this.setState({ page: newPage })}
          page={this.state.page}
        >
          {navTabs}
          {/* <NavBar.Tab title="Leaderboard">
            <i>L</i>
            <span>Leaderboard</span>
          </NavBar.Tab>
          <NavBar.Tab title="Main">
            <i>M</i>
            <span>Main</span>
          </NavBar.Tab>
          <NavBar.Tab title="Content">
            <i>C</i>
            <span>Content</span>
          </NavBar.Tab> */}
        </NavBar>
      </div>
    );
  }
}

export default Layout;
