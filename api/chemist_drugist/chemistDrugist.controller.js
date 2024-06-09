require("dotenv").config();
const { searchChemistDrugist } = require("./chemistDrugist.service");

module.exports = {
  searchChemistDrugist: async (req, res) => {
    try {
      searchChemistDrugist(
        req.body.query,
        req.user,
        async (error, response) => {
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
