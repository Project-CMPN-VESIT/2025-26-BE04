import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

async function connectDb() {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}?authSource=admin`
    );
    console.log("Connected to database: ", connection.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
}

export default connectDb;
