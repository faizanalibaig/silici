const { Router } = require("express");
const { requiresAuth } = require("express-openid-connect");

const auth0Controller = require("./auth0.controller");

const router = Router();
router.get("/profile", requiresAuth(), auth0Controller.profile);
router.get("/auth-status", auth0Controller.authStatus);

module.exports = router;

export {};
