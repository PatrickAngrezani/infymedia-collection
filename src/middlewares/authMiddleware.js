const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    try {
      token = jwt.sign(process.env.JWT_PAYLOAD, process.env.JWT_SECRET);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
