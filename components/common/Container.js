import styled from "react-emotion";

export default styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 15px;

  & h4 {
    font-size: 17px;
    text-transform: uppercase;
    font-family: "Roboto Condensed";
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-left: 5px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 400px) {
    padding: 0;
  }
`;
