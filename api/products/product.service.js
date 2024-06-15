const db = require("../../config/db.config");

module.exports = {
  searchProduct: (query, callback) => {
    db.query(
      `select * from products where (BRAND LIKE CONCAT(?, '%') OR  COMPANY LIKE CONCAT(?, '%') OR  CONTENT LIKE CONCAT(?, '%') OR  COM_FULL LIKE CONCAT(?, '%'))`,
      [query, query, query, query],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  searchProductByBrand: (brand, callback) => {
    db.query(
      `select * from products where BRAND=?`,
      [brand],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  getProductById: (id, callback) => {
    db.query(
      `select * from products where ID=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results.length ? results[0] : null);
      }
    );
  },
  getProductContent: (content, callback) => {
    db.query(
      `select
        IFNULL(ID,""),
        IFNULL(generic,""),
        IFNULL(dosage,""),
        IFNULL(CONTRAINDICATION,""),
        IFNULL(SPECIAL_PRECAUTIONS,""),
        IFNULL(INTERACTION,""),
        IFNULL(ADVERSE_DRUG_REACTION,""),
        IFNULL(PREGNANCY_CTG,""),
        IFNULL(LACTATION,"")
        from generic where generic=?`,
      [content],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results.length ? results[0] : null);
      }
    );
  },

  addToCart: (body, user, callback) => {
    db.query(
      `insert into cart(user_id,product_id,stockiest_id,quantity) values(?,?,?,?)`,
      [user.id, body.product_id, body.stockiest_id, body.quantity],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCart: (user, callback) => {
    // //
    db.query(
      `select c.*,p.*,c.id as cart_id from cart c left outer join products p on p.ID=c.product_id where c.user_id=?`,
      [user.id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  deleteCart: (cart_id, callback) => {
    // //
    db.query(
      `delete from cart where id=?`,
      [cart_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
};
