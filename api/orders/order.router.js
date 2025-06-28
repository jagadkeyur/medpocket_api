const { verifyToken } = require("../../config/hooks");
const {
  generateOrder,
  getOrders,
  getOrderById,
  getReceivedOrders,
  getOrderStatus,
  updateOrderById,
} = require("./order.controller");

const router = require("express").Router();
router.get("/generate", verifyToken, generateOrder);
router.get("/", verifyToken, getOrders);
router.get("/status", verifyToken, getOrderStatus);
router.get("/receive", verifyToken, getReceivedOrders);
router.get("/:orderId", verifyToken, getOrderById);
router.post("/:orderId", verifyToken, updateOrderById);

module.exports = router;
