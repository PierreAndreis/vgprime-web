import React from "react";
// @ts-ignore
import AdSense from "react-adsense";
import { withRouter } from "next/router";
import { css } from "@emotion/core";
import Box from "./Box";

declare global {
  interface Window {
    noAdBlock?: boolean;
  }
}

const container = css`
  width: 100%;
`;

const adblockDetectedContainer = css`
  ${Box};
  padding: 20px;
  margin: 10px 0px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
`;

class Ads extends React.Component<{}> {
  state = {
    active: true,
    adBlockDetected: false,
  };

  componentDidCatch() {
    this.setState({
      active: false,
    });
  }

  componentWillUnmount() {
    // IMPORTANT! Allow us to push new slot on other pages
    // @ts-ignore
    window.adsbygoogle = window.adsbygoogle || [];
    // @ts-ignore
    window.adsbygoogle.length = 0;
  }

  componentDidMount() {
    this.detectAdBlocker();
  }

  isThereAdblock = () => {
    const check = window.noAdBlock;

    if (!check) {
      this.setState({
        adBlockDetected: true,
      });
    }
  };

  detectAdBlocker() {
    const head = document.getElementsByTagName("head")[0];

    // we will dynamically generate some 'bait'.
    const script = document.createElement("script");
    script.id = "adblock-detection";
    script.type = "text/javascript";
    script.src = "/static/adsbygoogle.js";
    script.onload = this.isThereAdblock;
    script.onerror = this.isThereAdblock;
    head.appendChild(script);
  }

  render() {
    return (
      <div
        style={{
          margin: "5px auto",
          display: "inline",
          textAlign: "center",
        }}
        css={[container]}
      >
        {this.state.adBlockDetected ? (
          <div css={[adblockDetectedContainer]}>
            To support us, please consider disabling your adblock.
          </div>
        ) : (
          this.state.active && (
            <AdSense.Google
              client="ca-pub-8733440501534468"
              slot="4915906039"
              responsive="true"
            />
          )
        )}
        {!this.state.active && <div> error!</div>}
      </div>
    );
  }
}

export default withRouter(props => <Ads key={props.router.asPath} />);
