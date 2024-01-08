
const { User } = require("../../Models/UserModel/User.schema");
// const jwt = require('jsonwebtoken');
const deleteUser = async (req, res) => {
    // console.log(req.header)
    if(!req.header("email")){
        return res.status(401).send({ message: "no email sent" });
    }
    try {
      const user = await User.findOneAndDelete({email:req.header("email")}, {$set:req.body},{new:true}).select("-password-__v")
      res.status(200).send({ status:"Success", data: user });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while deleting users." });
    }
  };
  
  module.exports = deleteUser;
  