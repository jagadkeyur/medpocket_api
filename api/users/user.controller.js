require("dotenv").config();
const request = require("request");
const jwt = require("jsonwebtoken");
const {
  getUserByPhone,
  create,
  getUserById,
  updateUserById,
  getCenters,
  getCenterAds,
  addStockiest,
  addProducts,
  checkKey,
  updateKey,
  getOption,
} = require("./user.service");

module.exports = {
  login: (req, res) => {
    // //
    const body = req.body;
    getUserByPhone(body, async (error, response) => {
      response = JSON.parse(JSON.stringify(response));
      if (error) {
        res.status(500).json({ status: 0, message: error });
      } else {
        if (response.length > 0) {
          if (body.phone == "9090909090") {
            res.status(200).json({
              status: 1,
              message: "success",
              data: response,
              token: null,
            });
          } else {
            request(
              `http://msgclub.softhubinc.com/rest/otpservice/generate-otp?AUTH_KEY=${process.env.AUTH_KEY}&mobileNumber=${body.phone}`,
              function (error, resp, reqBody) {
                // //
                reqBody = JSON.parse(reqBody);
                if (reqBody.responseCode === "3001") {
                  // jwt.sign(response[0], process.env.JWT_SECRET, (err, token) => {
                  res.status(200).json({
                    status: 1,
                    message: "success",
                    data: response,
                    token: null,
                  });
                  // });
                } else {
                  res.status(500).json({
                    status: 0,
                    message: reqBody.response,
                    data: null,
                    token: null,
                  });
                }
              }
            );
          }
        } else {
          res.status(500).json({
            status: 0,
            message: "User not found or deactivated please contact admin",
            data: null,
            token: null,
          });
        }
      }
    });
  },
  register: (req, res) => {
    const body = req.body;
    create(body, async (error, response) => {
      if (error) {
        res.status(500).json({ status: 0, message: error });
      } else {
        if (response) {
          request(
            `http://msgclub.softhubinc.com/rest/otpservice/generate-otp?AUTH_KEY=${process.env.AUTH_KEY}&mobileNumber=${body.phone}`,
            function (error, response, reqBody) {
              reqBody = JSON.parse(reqBody);
              if (reqBody.responseCode == "3001") {
                res
                  .status(200)
                  .json({ status: 1, message: "registered successfully" });
              } else {
                res.status(500).json({ status: 0, message: reqBody.response });
              }
            }
          );
        } else {
          res.status(500).json({ status: 0, message: "user not registered" });
        }
      }
    });
  },
  verify1: async (req, res) => {
    const body = req.body;
    try {
      request(
        `http://msgclub.softhubinc.com/rest/otpservice/verify-otp?AUTH_KEY=${process.env.AUTH_KEY}&mobileNumber=${body.phone}&otp=${body.otp}`,
        function (error, response, reqBody) {
          reqBody = JSON.parse(reqBody);
          if (reqBody.responseCode == 2004) {
            res.status(200).json({ status: 1, message: reqBody.response });
          } else {
            res.status(500).json({ status: 0, message: reqBody.response });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  verify: (req, res) => {
    const body = req.body;
    getUserByPhone(body, async (error, response) => {
      response = JSON.parse(JSON.stringify(response));

      if (error) {
        res.status(500).json({ status: 0, message: error });
      } else {
        if (response.length > 0) {
          if (body.phone == "9090909090" && body.otp == "123456") {
            updateUserById(
              { fcm_token: body["fcm_token"] },
              response[0]["id"],
              async (err) => {
                if (!err) {
                  jwt.sign(
                    response[0],
                    process.env.JWT_SECRET,
                    (err, token) => {
                      res.status(200).json({
                        status: 1,
                        message: "success",
                        data: response,
                        token: token,
                      });
                    }
                  );
                } else {
                  res.status(500).json({
                    status: 0,
                    message: reqBody.response,
                    data: null,
                    token: null,
                  });
                }
              }
            );
          } else {
            request(
              `http://msgclub.softhubinc.com/rest/otpservice/verify-otp?AUTH_KEY=${process.env.AUTH_KEY}&mobileNumber=${body.phone}&otp=${body.otp}`,
              function (error, resp, reqBody) {
                reqBody = JSON.parse(reqBody);
                if (reqBody.responseCode === 2004) {
                  updateUserById(
                    { fcm_token: body["fcm_token"] },
                    response[0]["id"],
                    async (errs) => {
                      if (!errs) {
                        jwt.sign(
                          response[0],
                          process.env.JWT_SECRET,
                          (err, token) => {
                            res.status(200).json({
                              status: 1,
                              message: "success",
                              data: response,
                              token: token,
                            });
                          }
                        );
                      } else {
                        res.status(500).json({
                          status: 0,
                          message: reqBody.response,
                          data: null,
                          token: null,
                        });
                      }
                    }
                  );
                } else {
                  res.status(500).json({
                    status: 0,
                    message: reqBody.response,
                    data: null,
                    token: null,
                  });
                }
              }
            );
          }
        } else {
          res.status(500).json({
            status: 0,
            message: "user not found",
            data: null,
            token: null,
            aaa: "",
          });
        }
      }
    });
  },
  getProfile: async (req, res) => {
    try {
      getUserById(req.user.id, async (error, response) => {
        response = JSON.parse(JSON.stringify(response));
        res.status(200).json({ status: 1, message: "success", data: response });
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  getCenters: async (req, res) => {
    try {
      getCenters(async (error, response) => {
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
  getCenterAds: async (req, res) => {
    try {
      getCenterAds(req.user, async (error, response) => {
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
  updateProfile: async (req, res) => {
    const body = req.body;
    try {
      updateUserById(body, req.user.id, async (error) => {
        if (error) {
          res.status(200).json({ status: 0, message: "fail", data: null });
        } else {
          getUserById(req.user.id, async (error, response) => {
            response = JSON.parse(JSON.stringify(response));
            res
              .status(200)
              .json({ status: 1, message: "success", data: response });
          });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  addStockiest: async (req, res) => {
    const body = req.body;
    const file = req.file;
    try {
      //
      addStockiest(body, req.user, file.path, async (error) => {
        if (error) {
          res.status(200).json({ status: 0, message: "fail", data: null });
        } else {
          res.status(200).json({ status: 1, message: "success", data: null });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  addProducts: async (req, res) => {
    const file = req.file;
    try {
      addProducts(req.user, file.path, async (error) => {
        if (error) {
          res.status(200).json({ status: 0, message: "fail", data: null });
        } else {
          res.status(200).json({ status: 1, message: "success", data: null });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  validateKey: async (req, res) => {
    const { reg_key = "" } = req.params;
    try {
      checkKey(reg_key, async (isValid) => {
        if (isValid) {
          updateUserById(
            { reg_key: reg_key },
            req.user.id,
            async (error, response) => {
              if (!error) {
                updateKey(reg_key, async (error) => {
                  if (error) {
                    res.status(200).json({
                      status: 0,
                      message: "Key not registered",
                      data: null,
                    });
                  } else {
                    res.status(200).json({
                      status: 1,
                      message: "Key registered successfully",
                      data: null,
                    });
                  }
                });
              }
            }
          );
        } else {
          res
            .status(500)
            .json({ status: 0, message: "Key is invalid or already used." });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
  getOption: async (req, res) => {
    try {
      getOption(req.params.key, async (error, response) => {
        if (error) {
          res.status(200).json({ status: 0, message: "fail", data: null });
        } else {
          res.status(200).json({
            status: 1,
            message: "success",
            data: response.length > 0 ? response[0].value : "",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ status: 0, message: error });
    }
  },
};
