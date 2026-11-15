import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected successfully");
  } catch (err) {
    console.log(`fail to connect to DB: ${err.message}`);
  }
};
