import { Request, Response } from "express";
const { config } = require("../../config");

exports.profile = (req: any | Request, res: Response) => {
  res.send(JSON.stringify(req.oidc?.user));
};

exports.authStatus = (req: any | Request, res: Response) => {
  res.send(req.oidc?.isAuthenticated?.() ? "Logged in" : "Logged out");
};

exports.auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: config.auth0.secret,
  baseURL: config.auth0.baseURL,
  clientID: config.auth0.clientID,
  issuerBaseURL: config.auth0.issuerBaseURL,
};
