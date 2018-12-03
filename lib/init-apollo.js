import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import { ApolloLink } from "apollo-link";
import { RestLink } from "apollo-link-rest";
import getConfig from "next/config";
import "isomorphic-unfetch";

const { publicRuntimeConfig } = getConfig();

let apolloClient = null;

if (!process.browser) {
  global.Headers = require("fetch-headers");
  if (!global.Headers.prototype.forEach) {
    global.Headers.prototype.forEach = () => [];
  }
}

function create(initialState) {
  const links = ApolloLink.from([
    // withClientState({       // I will leave it here for future needs
    //   cache: new InMemoryCache(),
    //   resolvers,
    //   typeDefs,
    //   defaults,
    // }),
    new RestLink({
      uri: "https://api.vgpro.gg/",
      headers: new global.Headers().set("test", "test"),
    }),
    new HttpLink({
      uri: publicRuntimeConfig.api,
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
