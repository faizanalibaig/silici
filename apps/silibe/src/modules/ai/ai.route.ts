const { Router } = require("express");

const AIController = require("./ai.controller");

const router = Router();
router.route("/ai").get(AIController.generateTweets);

module.exports = router;
