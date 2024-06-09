const { verifyToken } = require("../../config/hooks");
const { getNews } = require("./news.controller");

const router = require("express").Router();
router.get("/", verifyToken, getNews);

module.exports = router;
