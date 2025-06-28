const db = require("../../config/db.config");
const { sendPushNotification } = require("../admin/admin.service");

module.exports = {
  generateOrder: (user, callback) => {
    const orderID = Math.floor(Math.random() * 1000000000);

    db.query(
      `INSERT INTO order_details(order_id, user_id, product_id, stockiest_id, quantity)
   SELECT ?, user_id, product_id, stockiest_id, quantity FROM cart WHERE user_id = ?`,
      [orderID, user.id],
      (error, results) => {
        if (!error) {
          db.query(
            `INSERT INTO order_master(order_id, user_id, amount)
         VALUES (?, ?, (
           SELECT SUM(CAST(p.MRP AS DECIMAL(10,2)) * o.quantity)
           FROM order_details o
           LEFT JOIN products p ON o.product_id = p.id
           WHERE o.order_id = ?
         ))`,
            [orderID, user.id, orderID],
            (error) => {
              if (!error) {
                db.query(
                  `DELETE FROM cart WHERE user_id = ?`,
                  [user.id],
                  (error) => {
                    if (!error) {
                      // 👉 Now fetch FCM tokens
                      db.query(
                        `SELECT 
                          u.firm_name AS user_firm,
                          u.fcm_token AS user_fcm_token
                        FROM order_details od
                        JOIN users u ON od.stockiest_id = u.firm_name
                        WHERE od.order_id = ?
                        LIMIT 1`,
                        [orderID],
                        (error, results) => {
                          if (error) return callback(error);

                          const fcmData =
                            results && results[0]
                              ? {
                                  userFirm: results[0].user_firm,
                                  userFcmToken: results[0].user_fcm_token,
                                }
                              : null;

                          sendPushNotification(
                            [fcmData.userFcmToken],
                            "New Order Created For you",
                            `You have received new order #${orderID}`,
                            async (er, response) => {
                              // if (er) res.status(500).json({ status: 0, message: er });
                              // else
                              // res.status(200).json({
                              //   status: 1,
                              //   message: "success",
                              //   data: null,
                              // });
                            }
                          );
                          return callback(null, results || null);
                        }
                      );
                    } else {
                      callback(error);
                    }
                  }
                );
              } else {
                callback(error);
              }
            }
          );
        } else {
          callback(error);
        }
      }
    );
  },

  getOrders: (user, callback) => {
    db.query(
      `select o.*,osm.Desc as txtStatus from order_master o left outer join order_status_master osm on o.status=osm.id where o.user_id=?`,
      [user.id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  getReceivedOrders: (user, callback) => {
    db.query(
      `select o.*,osm.Desc as txtStatus from order_master o left outer join order_status_master osm on o.status=osm.id left outer join order_details od on o.order_id=od.order_id  where od.stockiest_id=?`,
      [user.firm_name],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  getOrderById: (orderId, callback) => {
    db.query(
      `select o.*,p.* from order_details o left outer join products p on p.ID=o.product_id where o.order_id=?`,
      [orderId],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  getOrderStatus: (callback) => {
    db.query(
      `select * from order_status_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results || null);
      }
    );
  },
  updateOrderById: (body, id, callback) => {
    const data = Object.keys(body).map((key) => `${key}=?`);
    db.query(
      `update order_master set ${data.join(", ")} where order_id=?`,
      [...Object.values(body), id],
      (error, results, fields) => {
        if (!error) {
          // 👉 Now fetch FCM tokens
          db.query(
            `SELECT 
                          u.firm_name AS user_firm,
                          u.fcm_token AS user_fcm_token
                        FROM order_details od
                        JOIN users u ON od.stockiest_id = u.firm_name
                        WHERE od.order_id = ?
                        LIMIT 1`,
            [id],
            (error, results) => {
              if (error) return callback(error);

              const fcmData =
                results && results[0]
                  ? {
                      userFirm: results[0].user_firm,
                      userFcmToken: results[0].user_fcm_token,
                    }
                  : null;

              sendPushNotification(
                [fcmData.userFcmToken],
                "Your Order Updated",
                `Your order #${id} is updated`,
                async (er, response) => {
                  // if (er) res.status(500).json({ status: 0, message: er });
                  // else
                  // res.status(200).json({
                  //   status: 1,
                  //   message: "success",
                  //   data: null,
                  // });
                }
              );
              return callback(null, results || null);
            }
          );
        } else {
          callback(error);
        }
      }
    );
  },
};
