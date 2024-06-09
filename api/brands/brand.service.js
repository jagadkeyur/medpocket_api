const db = require("../../config/db.config");

module.exports = {
  searchBrand: (query, callback) => {
    db.query(
      `select p.*,b.*,(SELECT count(*) from products where brand=p.brand) as variants from products p left outer join brands b on b.name=p.brand where (p.brand LIKE CONCAT(?, '%')) group by p.brand`,
      [query],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  searchBrandByCompany: (company, callback) => {
    db.query(
      `select p.*,b.*,(SELECT count(*) from products where brand=p.brand) as variants from products p left outer join brands b on b.name=p.brand where (p.COMPANY LIKE CONCAT(?, '%')) group by p.brand`,
      [company],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  searchBrandByGeneric: (generic, callback) => {
    db.query(
      // `select * from brands b left outer join products p on b.Name=p.BRAND where b.Generic LIKE CONCAT('%',?, '%')`,
      `select p.*,b.*,(SELECT count(*) from products where brand=p.brand) as variants from products p left outer join brands b on b.name=p.brand where p.CONTENT=? group by p.brand`,
      [generic],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
};
