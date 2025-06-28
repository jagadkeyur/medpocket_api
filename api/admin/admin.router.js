const { verifyToken } = require("../../config/hooks");
const {
  login,
  getUsers,
  updateProfile,
  getStockiestRequest,
  getUserById,
  getKeys,
  getNews,
  getCenters,
  postNews,
  getCentersAds,
  deleteCentersAds,
  getCenterById,
  createCenter,
  updateCenterById,
  deleteCenter,
  postCenterAds,
  uploadDataSheet,
  getKeysBatch,
  generateKeysBatch,
  deleteBatch,
  uploadPIS,
  downloadDataSheet,
  downloadDataSheetPIS,
  getGeneralUsers,
  postGeneralUser,
  downloadDataSheetGeneric,
  uploadGeneric,
  deleteNews,
  getPIS,
  deletePIS,
} = require("./admin.controller");

const router = require("express").Router();
const multer = require("multer");
const multerPostNews = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/news");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadPostNews = multer({ storage: multerPostNews });
const multerCenter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/centers");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadCenter = multer({ storage: multerCenter });
const multerCenterAds = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/centers/centerAds");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadCenterAds = multer({ storage: multerCenterAds });
const multerCrossRef = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/crossRef");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadCrossRef = multer({ storage: multerCrossRef });
const multerUploadPIS = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pis");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadUploadPIS = multer({ storage: multerUploadPIS });
const multerUploadGeneric = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/generic");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").slice(-1);
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadUploadGeneric = multer({ storage: multerUploadGeneric });

router.post("/login", login);
router.get("/users", verifyToken, getUsers);
router.get("/keys", verifyToken, getKeys);
router.get("/keys/:id", verifyToken, getKeys);
router.get("/keys-batch", verifyToken, getKeysBatch);
router.post("/keys-batch", verifyToken, generateKeysBatch);
router.delete("/keys-batch/:id", verifyToken, deleteBatch);
router.get("/news", verifyToken, getNews);
router.get("/pis", verifyToken, getPIS);
router.get("/news-by/:center", verifyToken, getNews);
router.delete("/news/:id", verifyToken, deleteNews);
router.delete("/pis/:id", verifyToken, deletePIS);
router.post(
  "/news/add",
  verifyToken,
  uploadPostNews.any("attachments"),
  postNews
);
router.get("/centers", verifyToken, getCenters);
router.post(
  "/centers",
  verifyToken,
  uploadCenter.fields([
    { name: "header", maxCount: 1 },
    { name: "newslogo", maxCount: 1 },
  ]),
  createCenter
);
router.get("/centers/:id", verifyToken, getCenterById);
router.put(
  "/centers/:id",
  verifyToken,
  uploadCenter.fields([
    { name: "header", maxCount: 1 },
    { name: "newslogo", maxCount: 1 },
  ]),
  updateCenterById
);
router.delete("/centers/:id", verifyToken, deleteCenter);
router.get("/centers-ads/:centerId", verifyToken, getCentersAds);
router.post(
  "/centers-ads",
  verifyToken,
  uploadCenterAds.fields([{ name: "centerAds", maxCount: 100 }]),
  postCenterAds
);
router.delete("/centers-ads/:id", verifyToken, deleteCentersAds);
router.get("/users/:userId", verifyToken, getUserById);
router.get("/stockiest", verifyToken, getStockiestRequest);
router.post("/users/:userId", verifyToken, updateProfile);
router.post(
  "/upload",
  // verifyToken,
  uploadCrossRef.fields([{ name: "file", maxCount: 100 }]),
  uploadDataSheet
);
router.get(
  "/download-data",
  // verifyToken,
  downloadDataSheet
);
router.get(
  "/download-pis-data",
  // verifyToken,
  downloadDataSheetPIS
);
router.get(
  "/download-generic-data",
  // verifyToken,
  downloadDataSheetGeneric
);
router.post(
  "/upload-pis",
  // verifyToken,
  uploadUploadPIS.fields([{ name: "file", maxCount: 100 }]),
  uploadPIS
);
router.post(
  "/upload-generic",
  // verifyToken,
  uploadUploadGeneric.fields([{ name: "file", maxCount: 100 }]),
  uploadGeneric
);
router.get("/general-users", verifyToken, getGeneralUsers);
router.post("/general-users/add", verifyToken, postGeneralUser);
module.exports = router;
