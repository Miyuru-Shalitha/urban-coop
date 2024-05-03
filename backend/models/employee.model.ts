import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, "Please provide an employee ID"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: [true, "Please provide a role id"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const Employee =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
