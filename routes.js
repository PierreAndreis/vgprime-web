const routes = require("next-routes");

module.exports = routes()
  .add("index")
  .add("player", "/player/:name", "player")
  .add("article", "/article/:path", "article");
