import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";

import { Router } from "./../routes";

import withGA from "next-ga";

import { Global } from "@emotion/core";

import { Context as TrackingContext } from "../lib/tracking";

import globalStyle from "./../global/style";

import NextSeo from "next-seo";
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
        <Global styles={globalStyle} />
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
