// next.config.js
const withTypescript = require("@zeit/next-typescript");
module.exports = {
  ...withTypescript({
    webpack: config => {
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader",
      });

      return config;
    },
  }),
  publicRuntimeConfig: {
    //api: process.env.API_HOST || "http://localhost:8080",
    api: process.env.API_HOST || "https://services.vgpro.gg/",
    rulesModalValue: "none",
  },
  // webpack: (config, { dev }) => {
  //   config.module.rules.push({ test: /\.md$/, use: [{ loader: "raw-loader" }] });
  //   return config;
  // },
};
