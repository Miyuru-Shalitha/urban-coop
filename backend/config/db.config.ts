//import mongoose from "mongoose";
const mongoose = require("mongoose");


async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (error: Error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}

export default connect;
module.exports = {connect}