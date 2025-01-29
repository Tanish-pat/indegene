import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MongoUri);  // Removed useNewUrlParser and useUnifiedTopology
        console.log("Connected to MongoDB");
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log("Could not connect!");
        console.log("An Error occurred: ", error.message);
    }
};

export default connectDB;
