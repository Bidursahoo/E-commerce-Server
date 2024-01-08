const router = require("express").Router();
const fetchById = require("../../Controller/User Controller/fetchByID")
router.get("/fetchMyData" , fetchById);
// const fetchAllProduct = require("../../Controller/Product Controller/fetchAllProducts")
// router.post('/addToCart/:id' , fetchAllProduct)


module.exports = router;