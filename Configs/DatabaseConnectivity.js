const mongoose= require("mongoose")
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URL ).then(()=>console.log("Connected to DB")).catch(()=>console.log("Error in connection"))