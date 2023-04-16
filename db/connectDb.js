const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const mongoUri = "mongodb+srv://aksh2137:aksh2137@cluster0.jpqpxva.mongodb.net/test";
        const dbOptions = {
            dbName: "TiffinService"
        };
        const connect = await mongoose.connect(mongoUri, dbOptions);
        console.log("Database Connection Successfully");
    } catch (error) {
        console.log("error", error)
    }
}


module.exports = connectDb;