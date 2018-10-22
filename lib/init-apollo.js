import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import { ApolloLink } from "apollo-link";
import { RestLink } from "apollo-link-rest";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

import Headers from "fetch-headers";
const { publicRuntimeConfig } = getConfig();

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
  global.Headers = global.Headers || Headers;
}

function create(initialState) {
  const links = ApolloLink.from([
    new RestLink({
      uri: "https://api.vgpro.gg/",
    }),
    new HttpLink({
      uri: publicRuntimeConfig.api, // Server URL (must be absolute)
      credentials: "same-origin",
    }),
  ]);

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: links,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
