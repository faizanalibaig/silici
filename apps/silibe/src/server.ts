const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { config, databaseConfig } = require("./config");

const app = express();
const port = config.port;
databaseConfig();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export {}; //this is written to tackle with a weird bug.
