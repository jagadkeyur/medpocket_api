const db = require("../../config/db.config");

module.exports = {
  getNews: (user, callback) => {
    db.query(
      `select * from news where CENTER=? OR CENTER='ALL' ORDER BY msgTime DESC`,
      [user.city],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
};
