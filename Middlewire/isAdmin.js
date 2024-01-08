const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  jwt.verify(token, process.env.JWTKEY, (error, validToken) => {
    if (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({
        message: "Invalid token",
      });
    }else if(validToken.role !== "admin"){
      return res.status(401).json({
        message: "You are not an admin",
      });
    } else {
      req.user = validToken;
      // console.log(validToken)
      next();
    }
  });
};