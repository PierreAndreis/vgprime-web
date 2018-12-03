import * as React from "react";
import { css } from "emotion";
import Box from "./common/Box";
import { buttonCss } from "./common/Button";
import Modal from "./common/Modal";

const container = css`
  ${Box};
  width: 100%;
  background-image: linear-gradient(-135deg, #84aff5 0%, #91dde9 100%);
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin: 10px;
  height: 150px;
  cursor: pointer;
  & h2 {
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    & small {
      display: block;
      margin: 0;
      font-size: 24px;
    }
  }

  p {
    position: absolute;
    bottom: 15px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const modalContainer = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  & > header {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    & > h3 {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 16px;
    }
    & > .season {
      color: dodgerblue;
      margin-left: auto;
      font-weight: 600;
      font-size: 14px;
    }
  }
  & > section.buttons {
    display: flex;
    width: 270px;
    justify-content: space-around;
    margin: 15px auto 5px;
    & > button {
      ${buttonCss};
      margin: 0 20px;
      padding: 6px 0;
      width: 80px;
    }
  }

  & > section.prizes {
    display: flex;
    justify-content: space-around;
    width: 270px;
    margin: auto;
  }
`;

const prize = css`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-top: 10px;
  & > h5 {
    font-weight: 1000;
    color: rgba(0, 0, 0, 0.4);
    text-align: center;
    width: 70px;
    font-size: 12px;
  }
  & > span {
    text-align: right;
    font-size: 14px;
    font-weight: 600;
  }
`;

type PrizeProps = {
  title: string;
  value: string;
};

const Prize: React.SFC<PrizeProps> = ({ title, value }) => (
  <div className={prize}>
    <h5>{title}</h5>
    <span>{value}</span>
  </div>
);

type Props = {};

type State = {
  opened: boolean;
};

export default class extends React.Component<Props, State> {
  initialState: State = {
    opened: false,
  };
  state = this.initialState;
  open = () => {
    this.setState({ opened: true });
  };
  close = () => {
    this.setState({ opened: false });
  };
  render() {
    const { opened } = this.state;
    return (
      <>
        <div className={container} onClick={this.open}>
          <h2>
            +$1000<small>in prizes</small>
          </h2>
          <p>View More</p>
        </div>
        <Modal onClose={this.close} open={opened} maxWidth={300}>
          <div className={modalContainer}>
            <header>
              <h3>Prizes</h3>
              <span className="season">Dec 1st - 30th</span>
            </header>
            <section className="buttons">
              <button>Monthly</button>
              <button>Weekly</button>
            </section>
            <section className="prizes">
              <section>
                <Prize title="Top 1" value="300$" />
                <Prize title="Top 2" value="150$" />
                <Prize title="Top 3" value="100$" />
                <Prize title="Top 4" value="50$" />
                <Prize title="Top 5-15" value="10$" />
              </section>
              <section>
                <Prize title="Top 1" value="50$" />
                <Prize title="Top 2" value="30$" />
                <Prize title="Top 3" value="20$" />
              </section>
            </section>
          </div>
        </Modal>
      </>
    );
  }
}
