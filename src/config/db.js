import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constants";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB is connected`);
  } catch (err) {
    console.log(`MongoDB Error : ${err.message}`);
    process.exit();
  }
};
