require("dotenv").config();
const { searchGeneric } = require("./generic.service");

module.exports = {
  searchGeneric: async (req, res) => {
    try {
      searchGeneric(req.body.query, async (error, response) => {
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
