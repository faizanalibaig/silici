const { Router } = require("express");
const XController = require("./x.controller");

const router = Router();

router.post("/x-authorize", XController.connectX);

module.exports = router;
export {};
