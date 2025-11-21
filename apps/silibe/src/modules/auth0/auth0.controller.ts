import { Request, Response } from "express";

exports.profile = (req: any | Request, res: Response) => {
  console.log("Profile endpoint called", req.oidc?.user);

  res.send(JSON.stringify(req.oidc?.user));
};

exports.authStatus = (req: any | Request, res: Response) => {
  res.send(req.oidc?.isAuthenticated?.() ? "Logged in" : "Logged out");
};
