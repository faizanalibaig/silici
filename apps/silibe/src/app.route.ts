import { NextFunction, Request, Response } from "express";

const { Router } = require("express");
const router = Router();

router.route("/v0").get((req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use((req: Request, res: Response, next: NextFunction) => {
  res.json(`Url not found ${req.url}`);
});

module.exports = {
  AppRouter: router,
};
