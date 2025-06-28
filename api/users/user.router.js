const {
  login,
  register,
  verify,
  getProfile,
  updateProfile,
  getCenters,
  getCenterAds,
  addStockiest,
  addProducts,
  validateKey,
  getOption,
} = require("./user.controller");
const { verifyToken } = require("../../config/hooks");

const router = require("express").Router();
const multer = require("multer");
const multerStorageStockiest = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/stockiests");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadStockiest = multer({ storage: multerStorageStockiest });
const multerStorageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadProduct = multer({ storage: multerStorageProduct });

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ status: 1, message: "user fetched 123" });
});
router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);
router.get("/centers", getCenters);
router.get("/center/ads", verifyToken, getCenterAds);
router.get("/profile", verifyToken, getProfile);
router.get("/validate-key/:reg_key", verifyToken, validateKey);
router.get("/get-option/:key", verifyToken, getOption);
router.post("/profile", verifyToken, updateProfile);
router.post(
  "/stockiest",
  verifyToken,
  uploadStockiest.single("attachment"),
  addStockiest
);
router.post(
  "/product",
  verifyToken,
  uploadProduct.single("attachment"),
  addProducts
);

module.exports = router;
