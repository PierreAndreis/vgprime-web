import React from "react";
import { css } from "emotion";
import Box from "../common/Box";

const container = css`
  width: auto;
  ${Box} background-image: linear-gradient(-135deg, #78a6ef 0%, #63c0c9 100%);
  color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  margin: 0;

  padding: 10px;

  & p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  & h1 {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 10px 0;
  }
`;

export default class extends React.Component {
  render() {
    return (
      <div className={container}>
        <h1>How to participate</h1>
        <p>
          1994 issue of "Before & After" magazine traces "Lorem ipsum ..."
          to a jumbled Latin version of a passage from de Finibus Bonorum
          et Malorum, a treatise on the theory of ethics written by Cicero
          in 45 B.C. The passage "Lorem ipsum ..." is taken from text that
          reads, "Neque porro quisquam est qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit ...," which translates as,
          "There is no one who loves pain itself, who seeks after it and
          wants to have it, simply because it is pain..."
        </p>
        <h1>Prime Hours & Point System</h1>
        <p>
          During the 1500s, a printer adapted Cicero's text to develop a
          page of type samples. Since then, the Latin-like text has been
          the printing industry's standard for fake, or dummy, text. Before
          electronic publishing, graphic designers had to mock up layouts
          by drawing in squiggled lines to indicate text.
        </p>
        <h1>Rules</h1>
        <p>
          During the 1500s, a printer adapted Cicero's text to develop a
          page of type samples. Since then, the Latin-like text has been
          the printing industry's standard for fake, or dummy, text. Before
          electronic publishing, graphic designers had to mock up layouts
          by drawing in squiggled lines to indicate text.
        </p>
        <h1> Prizes </h1>
        <div style={{ display: "flex" }}>
          {Array.from(Array(6), i => i).map((i, index) => (
            <div
              key={index}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "rgba(100, 100, 100, 0.8)",
                marginLeft: "10px",
                flexShrink: 0,
                flexGrow: 0
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
