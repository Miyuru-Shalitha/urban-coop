import mongoose from "mongoose";
import Role from "../models/role.model";

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
      // createRoles();
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

const createRoles = async () => {
  const role1 = new Role({
    name: "Role 1",
    baseSalary: 75000,
  });

  const savedRole1 = role1.save();

  const role2 = new Role({
    name: "Role 2",
    baseSalary: 100000,
  });

  const savedRole2 = role2.save();

  const role3 = new Role({
    name: "Role 3",
    baseSalary: 120000,
  });

  const savedRole3 = role3.save();
};
