const db = require("../../config/db.config");

module.exports = {
  getLicences: (user, callback) => {
    db.query(
      `select * from valid_keys where is_used=0`,
      [],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
};
