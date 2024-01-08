const router = require("express").Router();
const fetchAllProduct = require("../Controller/Product Controller/fetchAllProducts")
router.get('/fetchAllProducts' , fetchAllProduct)


module.exports = router;