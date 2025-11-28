import { NextFunction, Request, Response } from "express";
const { Router } = require("express");

const AIRoutes = require("./modules/ai/ai.route");
const AuthRoutes = require("./modules/auth0/auth0.route");
const XRoutes = require("./modules/x-authorize/x.route");

const router = Router();

router.use("/api/v0", AIRoutes);
router.use("/api/v0", AuthRoutes);
router.use("/api/v0", XRoutes);

router.route("/v0").get((req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use((req: Request, res: Response, next: NextFunction) => {
  res.json(`Url not found ${req.url}`);
});

module.exports = {
  AppRouter: router,
};
