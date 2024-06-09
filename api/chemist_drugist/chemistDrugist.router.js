const { verifyToken } = require("../../config/hooks");
const { searchChemistDrugist } = require("./chemistDrugist.controller");

const router = require("express").Router();
router.post("/search", verifyToken, searchChemistDrugist);

module.exports = router;
