
const { User } = require("../../Models/UserModel/User.schema");
// const jwt = require('jsonwebtoken');
const fetchAllUserData = async (req, res) => {
    try {
      const users = await User.find().select("-password -__v");
      res.status(200).send({ data: users });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while fetching users." });
    }
  };
  
  module.exports = fetchAllUserData;
  