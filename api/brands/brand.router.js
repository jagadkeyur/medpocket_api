const { verifyToken } = require("../../config/hooks");
const {
  searchBrand,
  searchBrandByCompany,
  searchBrandByGeneric,
} = require("./brand.controller");

const router = require("express").Router();
router.post("/search", verifyToken, searchBrand);
router.post("/search-external", searchBrand);
router.get("/search/company/:companyId", verifyToken, searchBrandByCompany);
router.get("/search/generic/:generic", verifyToken, searchBrandByGeneric);

module.exports = router;
