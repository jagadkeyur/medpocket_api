require("dotenv").config();
const {
  searchBrand,
  searchBrandByCompany,
  searchBrandByGeneric,
} = require("./brand.service");

module.exports = {
  searchBrand: async (req, res) => {
    try {
      searchBrand(req.body.query, async (error, response, fields) => {
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
  searchBrandByCompany: async (req, res) => {
    console.log("req", req.params);
    try {
      searchBrandByCompany(
        req.params.companyId,
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
  searchBrandByGeneric: async (req, res) => {
    console.log("req", req.params);
    try {
      searchBrandByGeneric(
        req.params.generic,
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
