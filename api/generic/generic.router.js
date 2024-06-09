const { verifyToken } = require("../../config/hooks");
const { searchGeneric } = require("./generic.controller");

const router = require("express").Router();
router.post("/search", verifyToken, searchGeneric);

module.exports = router;
