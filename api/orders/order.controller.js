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
            res
              .status(200)
              .json({ status: 1, message: "success", data: response });
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
