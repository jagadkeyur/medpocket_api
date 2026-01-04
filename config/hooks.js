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
  verifyApiKey: (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ message: "API Key required" });
    }

    let keys = [];
    try {
      keys = JSON.parse(process.env.EXTERNAL_API_KEYS || "[]");
    } catch (e) {
      return res.status(500).json({ message: "API key config error" });
    }

    const keyObj = keys.find((k) => k.key === apiKey);

    if (!keyObj) {
      return res.status(403).json({ message: "Invalid API Key" });
    }

    if (new Date(keyObj.expires) < new Date()) {
      return res.status(403).json({ message: "API Key expired" });
    }

    req.partner = {
      name: keyObj.name,
      type: "external",
    };

    next();
  },
};
