import * as React from "react";
import { css } from "emotion";

const container = css`
  @media screen and (min-width: 551px) {
    display: none;
  }
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  bottom: 0px;
  left: 0;
  background: #fff;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
  & > ul {
    display: flex;
    & > li {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: calc(100% / 3);
      text-align: center;
      padding: 15px 0px;
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
      &:hover {
        color: #7aaeff;
      }
      &.active {
        border-bottom: 5px solid #4a90e2;
        fill: #4a90e2;
      }
      & > i {
        font-size: 14px;
        font-weight: 600;
      }
      & > span {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
`;

/*

  As pierre's said:
    primeiro eh os artigos + records, segundo leaderboard, terceiro o players (q vc da search)

*/

export type Page = string;
type Props = {
  page: Page;
  changeHandler: (newPage: Page) => void;
  children: React.ReactNode;
};

type TabProps = {
  title: Page;
  changeHandler?: (newPage: Page) => void;
  currentPage?: Page;
  children: React.ReactNode;
};

class NavBar extends React.Component<Props> {
  static Tab: React.SFC<TabProps> = ({ children, currentPage, title, changeHandler }) => (
    <li
      onClick={() => changeHandler!(title)}
      className={currentPage === title ? "active" : ""}
    >
      {children}
    </li>
  );

  render() {
    const { changeHandler, page } = this.props;
    return (
      <div className={container}>
        <ul>
          {React.Children.map(this.props.children, childElement =>
            React.isValidElement(childElement)
              ? React.cloneElement(childElement as React.ReactElement<any>, {
                  changeHandler,
                  currentPage: page,
                })
              : null
          )}
        </ul>
      </div>
    );
  }
}

export default NavBar;
