const mongoose = require("mongoose");

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to MongoDB at ${db.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:".red.bold);
    process.exit(1);
  }
}

module.exports = connectDB;
