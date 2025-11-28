const http = require("http");
import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { auth } = require("express-openid-connect");

const { config, databaseConfig } = require("./config");
const { AppRouter } = require("./app.route");

const app = express();
const port = config.port;
databaseConfig();

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(morgan("dev"));

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: config.auth0.secret,
    baseURL: config.auth0.baseURL,
    clientID: config.auth0.clientID,
    issuerBaseURL: config.auth0.issuerBaseURL,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World!");
});

app.use(AppRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export {}; //this is written to tackle with a weird bug.
