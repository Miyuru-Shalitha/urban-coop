import mongoose from "mongoose";

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (error) => {
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