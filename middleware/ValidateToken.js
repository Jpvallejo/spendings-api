const jwt = require("jsonwebtoken");

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.header("X-JWT-auth-token");
  if (!token) return res.status(401).json({ error: "Denied Access" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: "The given token is invalid" });
  }
};

module.exports = verifyToken;
