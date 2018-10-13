import { css } from "emotion";

const errorMessageClass = css`
  aside {
    padding: 1.5em;
    font-size: 14px;
    color: white;
    background-color: red;
  }
`;

interface ErrorMessageProps {
  message: string;
}

export default ({message}: ErrorMessageProps) => (
  <aside className={errorMessageClass}>
    {message}
  </aside>
)
