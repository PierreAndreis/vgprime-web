import { css } from "emotion";
import Layout from "./Layout";
import Box from "./Box";

const errorMessageClass = css`
  ${Box};
  font-size: 14px;
  color: white;
  background-color: red;

  margin: 15px 0;
`;

interface ErrorMessageProps {
  message: string;
}

export default ({ message }: ErrorMessageProps) => (
  <Layout.Content>
    <aside className={errorMessageClass}>{message}</aside>
  </Layout.Content>
);
