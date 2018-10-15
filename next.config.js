// next.config.js
const withTypescript = require("@zeit/next-typescript");
module.exports = {
  ...withTypescript(),
  publicRuntimeConfig: {
    api: process.env.API_HOST || "http://localhost:8080"
  }
};
