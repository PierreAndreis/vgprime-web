import React from "react";
// @ts-ignore
import AdSense from "react-adsense";
import { withRouter } from "next/router";
import { css } from "emotion";
import Box from "./Box";

declare global {
  interface Window {
    noAdBlock?: boolean;
  }
}

const container = css`
  ${Box}
  text-align: center;
  margin: 10px auto;
  width: auto;
  z-index: -1;
`;

const adblockDetectedContainer = css`
  padding: 20px;
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
      <div className={container}>
        {this.state.adBlockDetected ? (
          <div className={adblockDetectedContainer}>
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
      </div>
    );
  }
}

export default withRouter(props => <Ads key={props.router.asPath} />);
