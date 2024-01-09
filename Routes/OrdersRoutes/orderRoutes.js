const router = require("express").Router();
const createOrder = require("../../Controller/Orders/createOrder")
router.post("/placeOrder" , createOrder);
const fetchMyOrders = require("../../Controller/Orders/fetchMyOrders")
router.get('/myOrders',fetchMyOrders)
const addToCarts = require("../../Controller/ShoppingCart/addToCart")
router.post('/cart' , addToCarts)
const deleteFromCart = require("../../Controller/ShoppingCart/deleteFromCart")
router.delete("/deleteFromMyCart" , deleteFromCart);
const viewMyCart = require("../../Controller/ShoppingCart/viewShoppingCart")
router.get("/viewCart" , viewMyCart)
module.exports = router;