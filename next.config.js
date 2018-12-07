// next.config.js
const webpack = require("webpack");
require("dotenv").config();
const withTypescript = require("@zeit/next-typescript");
module.exports = {
  ...withTypescript({
    webpack(config, options) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          Emotion: "@emotion/core",
        })
      );

      return config;
    },
  }),
  publicRuntimeConfig: {
    api: process.env.API_HOST || "http://localhost:8080/",
    // api: process.env.API_HOST || "https://services.vgpro.gg/",
    rulesModalValue: "none",
  },
};
