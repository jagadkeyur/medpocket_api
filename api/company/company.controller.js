require("dotenv").config();
const {
  searchCompany,
  searchCompanyToStockiest,
  searchStockiestToCompany,
  companyToStockiest,
  stockiestToCompany,
  companyFromStockiest,
  stockiestFromCompany,
  getStockiestDetails,
} = require("./company.service");

const groupAndAdd = (arr, column) => {
  const res = [];
  arr.forEach((el) => {
    if (!this[el[column]]) {
      this[el[column]] = {
        name: el[column],
        childrens: [],
      };
      res.push(this[el[column]]);
    }
    this[el[column]].childrens.push(el);
  }, {});
  return res;
};

module.exports = {
  searchCompany: async (req, res) => {
    try {
      searchCompany(req.body.query, async (error, response) => {
        response = response ? JSON.parse(JSON.stringify(response)) : null;
        if (response) {
          response = response.sort((a, b) =>
            a["COMPANY"].localeCompare(b["COMPANY"])
          );
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
  companyToStockiest: async (req, res) => {
    try {
      companyToStockiest(
        req.body.query,
        req.user ? req.user.city : req.body.city,
        async (error, response) => {
          response = response ? JSON.parse(JSON.stringify(response)) : null;
          if (response) {
            response = response.sort((a, b) =>
              a["COMPANY_NAME"].localeCompare(b["COMPANY_NAME"])
            );
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
  stockestFromCompany: async (req, res) => {
    try {
      stockiestFromCompany(
        req.body.query,
        req.user ? req.user.city : req.body.city,
        async (error, response) => {
          response = response ? JSON.parse(JSON.stringify(response)) : null;
          if (response) {
            response = response.sort((a, b) =>
              a["FIRM_NAME"].localeCompare(b["FIRM_NAME"])
            );
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
  stockiestToCompany: async (req, res) => {
    try {
      stockiestToCompany(
        req.body.query,
        req.user ? req.user.city : req.body.city,
        async (error, response) => {
          response = response ? JSON.parse(JSON.stringify(response)) : null;
          if (response) {
            response = response.sort((a, b) =>
              a["FIRM_NAME"].localeCompare(b["FIRM_NAME"])
            );
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
  companyFromStockiest: async (req, res) => {
    try {
      companyFromStockiest(
        req.body.query,
        req.user ? req.user.city : req.body.city,
        async (error, response) => {
          response = response ? JSON.parse(JSON.stringify(response)) : null;
          if (response) {
            response = response.sort((a, b) =>
              a["COMPANY_NAME"].localeCompare(b["COMPANY_NAME"])
            );
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
  getStockiestDetails: async (req, res) => {
    try {
      getStockiestDetails(
        req.body.stockiest,
        req.user ? req.user.city : req.body.city,
        async (error, response) => {
          response = response ? JSON.parse(JSON.stringify(response)) : null;
          if (response) {
            res.status(200).json({
              status: 1,
              message: "success",
              // data: response,
              data: response.length ? response[0] : null,
            });
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
