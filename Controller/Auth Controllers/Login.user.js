const { User } = require("../../Models/UserModel/User.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
  
      const validPass = await bcrypt.compare(req.body.password, user.password);
  
      if (!validPass) {
        return res.status(400).send({ message: "Invalid Password" });
      }
  
      const tokenPayload = {
        _id: user._id,
        role: user.role,
        name:user.name
      };
  
      const token = jwt.sign(tokenPayload, process.env.JWTKEY);
  
      res.status(200).send({
        welcome:`Hello ${user.name}`,
        token: token,
        message: "Signing in, please wait...",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while processing the request." });
    }
  }
module.exports = loginUser;
