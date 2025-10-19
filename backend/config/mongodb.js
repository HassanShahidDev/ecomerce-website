import mongoose from "mongoose";

const connectDB = async () => {
  console.log("🔗 Connecting to MongoDB...");

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });

    console.log("✅ DB Connected Successfully:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};

export default connectDB;
