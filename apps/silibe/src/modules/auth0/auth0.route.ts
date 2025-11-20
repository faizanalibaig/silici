const { Router } = require("express");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

const auth0Controller = require("./auth0.controller");

const router = Router();

router.use(auth(auth0Controller.auth0Config));
router.get("/profile", requiresAuth(), auth0Controller.profile);
router.get("/auth-status", auth0Controller.authStatus);

module.exports = router;

export {};
