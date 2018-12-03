import React from "react";
// @ts-ignore
import AdSense from "react-adsense";

class Ads extends React.Component<{}> {
  state = {
    active: true,
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

  render() {
    return (
      <div style={{ margin: "5px auto", display: "inline", textAlign: "center" }}>
        {this.state.active && (
          <AdSense.Google client="ca-pub-8733440501534468" slot="4915906039" />
        )}
      </div>
    );
  }
}

export default Ads;
