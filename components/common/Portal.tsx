import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

let portalContainer: undefined | HTMLDivElement;

const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

interface Props {
  children: ReactNode;
}

export default class Portal extends React.Component<Props> {
  el: undefined | HTMLDivElement;

  constructor(props: Props) {
    super(props);

    // This fixes SSR
    if (!canUseDom) return;

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      document.body.appendChild(portalContainer);
    }

    this.el = document.createElement("div");
  }

  componentDidMount() {
    portalContainer && this.el && portalContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    portalContainer && this.el && portalContainer.removeChild(this.el);
  }

  render() {
    // This fixes SSR
    if (!canUseDom || !this.el) return null;
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
