
const { User } = require("../../Models/UserModel/User.schema");
// const jwt = require('jsonwebtoken');
const fetchById = async (req, res) => {
    // console.log(req.header)
    try {
      const users = await User.find({_id:req.userId}).select("-password -role -__v");
      res.status(200).send({ data: users });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while fetching users." });
    }
  };
  
  module.exports = fetchById;
  