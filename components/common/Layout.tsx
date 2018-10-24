import * as React from "react";
import { css } from "emotion";
import Prizes from "../Prizes";
import Router from "next/router";
import Rules from "../Rules";
import Cookies from "js-cookie";

const rulesModalValue = require("../../next.config").publicRuntimeConfig.rulesModalValue;

const container = css`
  width: auto;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;

  display: grid;
  grid-template:
    "header header" auto
    "prizes sidebar" auto
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
    grid-template:
      "header header" auto
      "sidebar prizes" auto
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

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
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
  animation: fadeIn 1s ease;
`;

const prizes = css`
  grid-area: prizes;
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
  static Sidebar: React.SFC<{}> = ({ children }) => (
    <div className={sidebar}>{children}</div>
  );
  static Content: React.SFC<{}> = ({ children }) => (
    <div className={content}>{children}</div>
  );

  constructor(props: {}) {
    super(props);
    this.state = { rulesOpened: false };
  }

  componentDidMount() {
    if (typeof document !== "undefined") {
      const rulesDate = Cookies.get("rulesModal");
      if (!rulesDate || rulesDate !== rulesModalValue) {
        Cookies.set("rulesModal", rulesModalValue);
        setTimeout(() => this.setState({ rulesOpened: true }), 1000);
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

  gotoIndex = () => Router.push("/");

  render() {
    return (
      <div className={container}>
        <div className={header}>
          <div className={logo} onClick={this.gotoIndex} />
          <button className={rulesButton} onClick={this.openRulesModal}>
            Rules
          </button>
        </div>
        <div className={prizes}>
          <h4>Prizes</h4>
          <Prizes />
        </div>
        <Rules opened={this.state.rulesOpened} closeAction={this.closeRulesModal} />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
