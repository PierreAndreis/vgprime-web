import * as React from "react";
import { css, cx } from "emotion";

export const buttonCss = css`
  border: 0;
  border-radius: 20px;
  border-color: transparent;
  outline: 0;

  padding: 10px 15px;
  margin: 0 5px 2px;

  color: white;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;

  background: #74e1eb;
  background-image: linear-gradient(-45deg, #7aaeff 0%, #74e1eb 100%);
  box-shadow: 0 0 10px #77c8f5;

  cursor: pointer;
  transition: all 300ms;

  &:hover {
    background: #74e1eb;
  }

  &:disabled {
    background: #f3f3f3;
    border: 1.5px solid #adadad;
    box-shadow: none;
    cursor: no-drop;
    color: #adadad;
  }
`;

type ButtonProps = {
  className?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.SFC<ButtonProps> = ({ className, ...props }) => (
  <button className={cx(className, buttonCss)} {...props} />
);

export default Button;
