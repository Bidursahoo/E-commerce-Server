
const { Orders } = require("../../Models/Orders/Orders.schema");
// const jwt = require('jsonwebtoken');
const fetchMyOrders = async (req, res) => {
    try {
      const order = await Orders.find({customerId:req.userId}).select("-password -__v");
      res.status(200).send({ data: order });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "An error occurred while fetching order." });
    }
  };
  
  module.exports = fetchMyOrders;
  