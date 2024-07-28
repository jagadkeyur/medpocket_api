const { sendPushNotification } = require("../admin/admin.service");
const { getUserById } = require("../users/user.service");
const {
  generateOrder,
  getOrders,
  getOrderById,
  getReceivedOrders,
  getOrderStatus,
  updateOrderById,
} = require("./order.service");

require("dotenv").config();

module.exports = {
  generateOrder: async (req, res) => {
    try {
      generateOrder(req.user, async (error, response, fields) => {
        response = response ? JSON.parse(JSON.stringify(response)) : null;
        if (response) {
          res
            .status(200)
            .json({ status: 1, message: "success", data: response });
        } else {
          res.status(500).json({ status: 0, message: error });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  getOrders: async (req, res) => {
    try {
      getOrders(req.user, async (error, response, fields) => {
        response = response ? JSON.parse(JSON.stringify(response)) : null;
        if (response) {
          res
            .status(200)
            .json({ status: 1, message: "success", data: response });
        } else {
          res.status(500).json({ status: 0, message: error });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  getOrderStatus: async (req, res) => {
    try {
      getOrderStatus(async (error, response, fields) => {
        response = response ? JSON.parse(JSON.stringify(response)) : null;
        if (response) {
          res
            .status(200)
            .json({ status: 1, message: "success", data: response });
        } else {
          res.status(500).json({ status: 0, message: error });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  getReceivedOrders: async (req, res) => {
    try {
      getReceivedOrders(req.user, async (error, response, fields) => {
        response = response ? JSON.parse(JSON.stringify(response)) : null;
        if (response) {
          res
            .status(200)
            .json({ status: 1, message: "success", data: response });
        } else {
          res.status(500).json({ status: 0, message: error });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  getOrderById: async (req, res) => {
    try {
      getOrderById(req.params.orderId, async (error, response, fields) => {
        response = response ? JSON.parse(JSON.stringify(response)) : null;
        if (response) {
          res
            .status(200)
            .json({ status: 1, message: "success", data: response });
        } else {
          res.status(500).json({ status: 0, message: error });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  updateOrderById: async (req, res) => {
    try {
      updateOrderById(
        req.body,
        req.params.orderId,
        async (error, response, fields) => {
          response = response ? JSON.parse(JSON.stringify(response)) : null;
          if (response) {
            getOrderById(req.params.orderId, (errOrder, resOrder) => {
              const { user_id = 0 } = resOrder?.[0] || {};
              getUserById(user_id, (errUser, resUser) => {
                const { fcm_token = "" } = resUser || {};
                if (fcm_token) {
                  sendPushNotification(
                    [fcm_token],
                    "Order Updated",
                    `Order No. ${req.params.orderId}`,
                    async (er, response) => {
                      // if (er) res.status(500).json({ status: 0, message: er });
                      // else
                      res
                        .status(200)
                        .json({ status: 1, message: "success", data: null });
                    }
                  );
                } else {
                  res
                    .status(200)
                    .json({ status: 1, message: "success", data: null });
                }
              });
            });
            // res
            //   .status(200)
            //   .json({ status: 1, message: "success", data: response });
          } else {
            res.status(500).json({ status: 0, message: error });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
};
