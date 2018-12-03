import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";

import { injectGlobal } from "emotion";
import { hydrate } from "react-emotion";

import { Router } from "./../routes";

import NextSeo from "next-seo";
import withGA from "next-ga";

import { Context as TrackingContext } from "../lib/tracking";

import "./../global/style";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

// import your default seo configuration
import SEO from "../next-seo.config";

// if (process.env.NODE_ENV !== "production") {
//   const { whyDidYouUpdate } = require("why-did-you-update");
//   whyDidYouUpdate(React, { exclude: [/^Skeleton|Query|Styled/] });
// }

class VGPRIME extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <NextSeo config={SEO} />
        <div className="vgproLogoBg" />
        <TrackingContext.Provider value={this.props.analytics}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </TrackingContext.Provider>
      </Container>
    );
  }
}

export default withGA("UA-93754104-3", Router)(withApolloClient(VGPRIME));
