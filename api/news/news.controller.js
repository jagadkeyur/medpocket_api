const { getNews } = require("./news.service");

require("dotenv").config();

module.exports = {
  getNews: async (req, res) => {
    try {
      getNews(req.user, async (error, response) => {
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
