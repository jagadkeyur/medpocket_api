const db = require("../../config/db.config");

module.exports = {
  searchGeneric: (query, callback) => {
    db.query(
      `select * from products where (CONTENT LIKE CONCAT(?, '%'))`,
      [query],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        results = results.length
          ? results.filter(
              (arr, index, self) =>
                index === self.findIndex((t) => t.CONTENT === arr.CONTENT)
            )
          : [];
        return callback(null, results || null);
      }
    );
  },
};
