//Admin email : biduradmin@example.com
//Admin pass : admin123
const express = require('express')
require('dotenv').config();
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAnalytics } =require("firebase/analytics");
const firebaseConfig = require("./Configs/FirebaseConfig.js")
const DatabaseConnectivity = require("./Configs/DatabaseConnectivity.js");
const UserSchema = require("./Models/UserModel/User.schema.js");
const authRoutes = require("./AuthRoutes/authRoutes.js")
const VerifyToken = require("./Middlewire/VerifyToken.js");
const isAdmin = require("./Middlewire/isAdmin.js")
const adminUserRoutes = require("./Routes/UserRoutes/AdminUserRoutes.js")
const tokenUserRoutes = require("./Routes/UserRoutes/TokenUserRoutes.js")
const app = express()
// dotenv.config();
const port = process.env.PORT;
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
app.use(cors())
app.use(express.json())
app.use("/api",isAdmin , adminUserRoutes );
app.use("/auth", authRoutes)
app.use("/profile/",VerifyToken , tokenUserRoutes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})