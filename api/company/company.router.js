const { verifyToken } = require("../../config/hooks");
const {
  searchCompany,
  companyToStockiest,
  stockestFromCompany,
  stockiestToCompany,
  companyFromStockiest,
  getStockiestDetails,
} = require("./company.controller");

const router = require("express").Router();
router.post("/search", verifyToken, searchCompany);
router.post("/company-to-stockiest", verifyToken, companyToStockiest);
router.post("/stockiest-from-company", verifyToken, stockestFromCompany);
router.post("/stockiest-to-company", verifyToken, stockiestToCompany);
router.post("/company-from-stockiest", verifyToken, companyFromStockiest);
router.post("/stockiest-details", verifyToken, getStockiestDetails);
router.post("/external-company-to-stockiest", companyToStockiest);
router.post("/external-stockiest-from-company", stockestFromCompany);
router.post("/external-stockiest-to-company", stockiestToCompany);
router.post("/external-company-from-stockiest", companyFromStockiest);
router.post("/external-stockiest-details", getStockiestDetails);

module.exports = router;
