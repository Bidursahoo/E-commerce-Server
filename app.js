//Admin email : biduradmin@example.com
//Admin pass : admin123
const express = require('express')
// const multipart = require('connect-multiparty');
const bodyParser = require("body-parser")
// const multipartMiddleware = multipart();
require('dotenv').config();
const cors = require("cors");
require("./Configs/DatabaseConnectivity.js")
const authRoutes = require("./AuthRoutes/authRoutes.js")
const VerifyToken = require("./Middlewire/VerifyToken.js");
const isAdmin = require("./Middlewire/isAdmin.js")
const isSeller = require("./Middlewire/isSeller.js")
const firebase = require("./Middlewire/firebase.js")
const productRoutes = require("./Routes/ProductsRoutes/productRoutes.js")
const adminUserRoutes = require("./Routes/UserRoutes/AdminUserRoutes.js")
const tokenUserRoutes = require("./Routes/UserRoutes/TokenUserRoutes.js")
const isCustomer = require("./Middlewire/isCustomer.js")
const orderRoutes = require("./Routes/OrdersRoutes/orderRoutes.js")
// const firebaseController = require("./Controller/Firebase/firebaseController.js")
const verifiedTokenUsers = require("./Routes/verifiedTokenUsers.js")
const app = express()
// dotenv.config();
const port = process.env.PORT;
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// app.use(multipart());
app.use(cors())
app.use(express.json())
app.use("/api",isAdmin , adminUserRoutes );
app.use("/auth", authRoutes)
app.use("/common/" , VerifyToken , verifiedTokenUsers)
app.use("/profile/",VerifyToken , tokenUserRoutes);
app.use("/product",[isSeller, firebase] , productRoutes)
app.use("/orders" , isCustomer , orderRoutes)
// app.use("/",firebaseController)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})