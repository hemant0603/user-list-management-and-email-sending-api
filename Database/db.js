const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to the Database");
    }
    catch (err) {
        console.error(err);
    }
};


module.exports = connectDB;