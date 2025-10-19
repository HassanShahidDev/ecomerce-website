import mongoose from "mongoose";

const uri = "mongodb+srv://hassan23:1234567890@cluster0.ovoajcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("🔗 Trying to connect to MongoDB...");

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("✅ Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  });
