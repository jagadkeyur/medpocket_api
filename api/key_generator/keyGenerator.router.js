const { verifyToken } = require("../../config/hooks");
const { getLicences } = require("./keyGenerator.controller");

const router = require("express").Router();
router.get("/", verifyToken, getLicences);

module.exports = router;
