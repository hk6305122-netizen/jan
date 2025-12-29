const http = require("http");

const { app } = require("./src/app");

const port = Number.parseInt(process.env.PORT || "4000", 10);

const server = http.createServer(app);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`WalkTrack backend listening on port ${port}`);
});
