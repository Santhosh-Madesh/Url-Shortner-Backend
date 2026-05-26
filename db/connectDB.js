const mongoose = require("mongoose");

const connectDB = async() => {

    try{

        const database = await mongoose.connect(process.env.MONGO_DB_URI);

        console.log("Database connected successfully!");

    } catch(error){

        console.log("Database failed to connect "+`\n error: ${error}`);
        process.exit(0);

    }
}

module.exports = connectDB;