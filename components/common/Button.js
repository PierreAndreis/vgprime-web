import styled from "react-emotion";

export default styled.button`
  border: 0;
  padding: 10px 15px;
  margin: 0 5px 2px;
  border-radius: 20px;

  background: transparent;
  color: black;
  transition: all 300ms;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  outline: 0;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  background: #74e1eb;
  background-image: linear-gradient(-45deg, #7aaeff 0%, #74e1eb 100%);
  box-shadow: 0 0 10px #77c8f5;
  border-color: transparent;
  color: white;

  transition: all 300ms;

  &:hover {
    background: #74e1eb;
  }

  &:disabled {
    background: #a9a9a9;
    box-shadow: none;
    cursor: no-drop;
    color: #3e3e3e;
  }
`;
