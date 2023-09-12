import mongoose from "mongoose";
import colors from "colors";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb database ${conn.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`Error in Mongodb ${error}`.bgRed.black)
    }
};

export default connectDB;