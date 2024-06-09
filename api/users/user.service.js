const db = require("../../config/db.config");

module.exports = {
  create: (data, callback) => {
    db.query(
      `insert into users(firm_name,phone,city,uuid,device_id) values(?,?,?,?,?)`,
      [data.firm_name, data.phone, data.city, data.uuid, data.device_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByPhone: (data, callback) => {
    db.query(
      `select * from users where phone=? and device_id=? and active=1`,
      [data.phone, data.device_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserById: (id, callback) => {
    db.query(
      `select u.*,c.* from users u left outer join centers c on c.center=u.city where u.id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results.length ? results[0] : null);
      }
    );
  },
  getCenters: (callback) => {
    db.query(
      `select center from centers where isEnabled=1`,
      [],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  getCenterAds: (user, callback) => {
    db.query(
      `select ca.* from center_ads ca left outer join centers c on c.ID=ca.center_id where c.center=? `,
      [user.city],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  updateUserById: (body, id, callback) => {
    const data = Object.keys(body).map((key) => `${key}=?`);
    db.query(
      `update users set ${data.join(", ")} where id=?`,
      [...Object.values(body), id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  addStockiest: (data, user, attachment, callback) => {
    db.query(
      `insert into uploaded_stockiests(user_id,firm_name,phone,center,attachment) values(?,?,?,?,?)`,
      [user.id, data.firm_name, data.phone, data.center, attachment],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  addProducts: (user, attachment, callback) => {
    db.query(
      `insert into uploaded_products(user_id,attachment) values(?,?)`,
      [user.id, attachment],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },

  checkKey: (key, callback) => {
    db.query(
      `select * from valid_keys where reg_key=? and is_used=0`,
      [key],
      (error, results, fields) => {
        if (error) {
          return callback(false);
        }
        return callback(results.length > 0 ? true : false);
      }
    );
  },
  checkKey: (key, callback) => {
    db.query(
      `select * from valid_keys where reg_key=? and is_used=0`,
      [key],
      (error, results, fields) => {
        if (error) {
          return callback(false);
        }
        return callback(results.length > 0 ? true : false);
      }
    );
  },
  updateKey: (key, callback) => {
    db.query(
      `update valid_keys set is_used=1 where reg_key=?`,
      [key],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getOption: (key, callback) => {
    db.query(
      `select * from app_settings where key_name=?`,
      [key],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
