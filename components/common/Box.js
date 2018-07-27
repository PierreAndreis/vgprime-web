import styled from "react-emotion";

export const Box = styled.div`
  width: 320px;
  margin: 5px 2px 15px;
  background: #213141;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);

  padding: 10px;

  border-radius: 5px;

  /* Flex so we can have actions at bottom */
  display: flex;
  flex-direction: column;

  background: #ffffff;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
`;
