const { getLicences } = require("./keyGenerator.service");

require("dotenv").config();

module.exports = {
  getLicences: async (req, res) => {
    try {
      getLicences(req.user, async (error, response) => {
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
};
