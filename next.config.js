// next.config.js
const withTypescript = require("@zeit/next-typescript");
module.exports = {
  ...withTypescript(),
  publicRuntimeConfig: {
    api: process.env.API_HOST || "http://localhost:8080/",
    // api: process.env.API_HOST || "https://services.vgpro.gg/",
    rulesModalValue: "none",
  },
};
