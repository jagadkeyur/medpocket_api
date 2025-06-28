const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    //
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null || token == "" || token == "null")
      return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log("err token", err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    });
  },
};
