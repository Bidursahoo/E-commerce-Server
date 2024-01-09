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
    }else if(validToken.role !== "customer"){
      return res.status(401).json({
        message: "You are not an admin",
      });
    } else {
      req.user = validToken;
      req.userName= validToken.name,
      req.userId = validToken._id
      req.userPhone= validToken.phone,
      req.userAddress = validToken.address
      // console.log(validToken)
      next();
    }
  });
};