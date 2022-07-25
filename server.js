const express = require("express"),
  serveStatic = require("serve-static"),
  history = require("connect-history-api-fallback"),
  port = process.env.PORT || 5000,
  path = require("path");

const app = express();
var prerender = require("prerender-node")
  .set("protocol", "https")
  .set("prerenderToken", "v9z08bG9nqk485pWRJIX");
prerender.crawlerUserAgents.splice(
  prerender.crawlerUserAgents.indexOf("googlebot"),
  1
);
app.use(prerender);
app.use(history());

app.use(serveStatic(path.join(__dirname, "/dist/spa")));
app.listen(port);
