const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = verifyToken;
