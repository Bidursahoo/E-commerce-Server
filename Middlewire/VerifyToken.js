const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      message: "Access denied, no token provided",
    });
  }

  jwt.verify(token, process.env.JWTKEY, (error, validToken) => {
    if (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({
        message: "Invalid token",
      });
    } else {
        // console.log(validToken.role);
      req.user = validToken;
      req.userId= validToken._id
      // console.log(validToken)
      next();
    }
  });
};