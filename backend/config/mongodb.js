
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {

    mongoose.connect(process.env.MONGODB_URI,{

    })
    .then(() => {console.log("connection established successfully")})
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })

}

module.exports = connectDB;
