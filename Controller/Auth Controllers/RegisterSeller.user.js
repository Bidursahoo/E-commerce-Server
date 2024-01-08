
const bcrypt = require("bcrypt");
const { User } = require("../../Models/UserModel/User.schema");
// const jwt = require('jsonwebtoken');
const registerSeller = async (req, res) => {
  // console.log(req.body)
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ message: "Email is already in use" });
      }
      const saltPassword = await bcrypt.genSalt(Number(process.env.ROUNDS));
      const hashedPassword = await bcrypt.hash(req.body.password, saltPassword);
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        role:"seller"
      });
      const savedUser = await newUser.save();
      res.status(200).send({
        data: savedUser,
        message: "Account created successfully",
      });
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .send({
          errorDetail: error,
          message: "An error occurred while processing the request.",
        });
    }
  }




module.exports = registerSeller;