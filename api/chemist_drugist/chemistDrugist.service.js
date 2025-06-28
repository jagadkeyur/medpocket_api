const db = require("../../config/db.config");

module.exports = {
  searchChemistDrugist: (query, user, callback) => {
    db.query(
      `select * from chemistsdruggiest where (firm_name LIKE CONCAT(?, '%')) and CENTER=?`,
      [query, user.city],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
};
