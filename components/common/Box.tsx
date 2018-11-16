import { css } from "emotion";

export const Box = css`
  background: #213141;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);

  border-radius: 10px;

  /* Flex so we can have actions at bottom */
  display: flex;
  flex-direction: column;

  background: #ffffff;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
`;

export default Box;
