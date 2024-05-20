import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI:string = process.env.DB_URI || " ";

export const connectDB = async () => {
    try{

        await mongoose.connect(DB_URI).then(() => {
            console.log("Database connection successfull");
        })

    }catch(err){

        console.log(err);
        
    }
}