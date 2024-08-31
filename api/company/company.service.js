const db = require("../../config/db.config");

// const groupBy = (items, key, findKey) => {
//   const filtered = items.filter(
//     (arr, index, self) =>
//       index === self.findIndex((t) => t[findKey] === arr[findKey])
//   );
//   const arr = [];
//   filtered.map((ft) => {
//     arr.push({
//       ...ft,
//       [key]: items.filter((dt) => dt[findKey] == ft[findKey]),
//     });
//   });
//   return arr;
// };

module.exports = {
  searchCompany: (query, callback) => {
    db.query(
      `select * from products WHERE MATCH(COM_FULL) AGAINST(? IN BOOLEAN MODE) group by COM_FULL`,
      // `select * from products where (COM_FULL LIKE CONCAT('%',?,'%')) group by COM_FULL`,
      [query],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        // results = groupBy(results, "BRANDS", "COM_FULL");
        return callback(null, results || null);
      }
    );
  },
  companyToStockiest: (query, city, callback) => {
    //
    var queryString = `select * from crossreference where COMPANY_NAME LIKE CONCAT(?, '%') and CENTER=?`;

    db.query(queryString, [query, city], (error, results, fields) => {
      if (error) {
        callback(error);
      }

      results = results.filter(
        (arr, index, self) =>
          index === self.findIndex((t) => t.COMPANY_NAME === arr.COMPANY_NAME)
      );
      return callback(null, results || null);
    });
  },
  stockiestFromCompany: (query, city, callback) => {
    //
    var queryString = `SELECT * FROM crossreference WHERE COMPANY_NAME=? and CENTER=? GROUP BY FIRM_NAME`;

    db.query(queryString, [query, city], (error, results, fields) => {
      if (error) {
        callback(error);
      }

      return callback(null, results || null);
    });
  },
  stockiestToCompany: (query, city, callback) => {
    //
    var queryString = `select * from crossreference where FIRM_NAME LIKE CONCAT(?, '%') and CENTER=?`;

    db.query(queryString, [query, city], (error, results, fields) => {
      if (error) {
        callback(error);
      }

      results = results.length
        ? results.filter(
            (arr, index, self) =>
              index === self.findIndex((t) => t.FIRM_NAME === arr.FIRM_NAME)
          )
        : [];
      return callback(null, results || null);
    });
  },
  companyFromStockiest: (query, city, callback) => {
    //
    var queryString = `select c.*,s.* from crossreference c left outer join stockiests s ON (s.firm_name LIKE CONCAT(SUBSTRING_INDEX(c.FIRM_NAME,'-',1),'%')) where (c.FIRM_NAME LIKE CONCAT(?,'%'))`;

    db.query(queryString, [query, city], (error, results, fields) => {
      if (error) {
        callback(error);
      }

      results = results.filter(
        (arr, index, self) =>
          index === self.findIndex((t) => t.COMPANY_NAME === arr.COMPANY_NAME)
      );
      return callback(null, results || null);
    });
  },
  getStockiestDetails: (stockiest, city, callback) => {
    //

    var queryString = `select * from chemistsdruggiest where REPLACE(firm_name," ","")=REPLACE(?," ","") AND CENTER=?`;
    // var queryString = `select * from stockiests where firm_name LIKE CONCAT(SUBSTRING_INDEX(?,'-',1),'%')`;

    db.query(queryString, [stockiest, city], (error, results, fields) => {
      // debugger;
      if (error) {
        callback(error);
      }

      if (results.length) {
        return callback(null, results || null);
      } else {
        var queryString1 = `select * from stockiests where REPLACE(firm_name," ","")=REPLACE(?," ","") AND CENTER=?`;
        // var queryString1 = `select * from chemistsdruggiest where firm_name LIKE CONCAT(SUBSTRING_INDEX(?,'-',1),'%')`;
        db.query(queryString1, [stockiest, city], (error, results, fields) => {
          // debugger;
          //
          if (error) {
            callback(error);
          }
          return callback(null, results || null);
        });
      }
    });
  },
};
