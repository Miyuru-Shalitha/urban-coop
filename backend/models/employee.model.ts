import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide the first name"],
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide the last name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide the address"],
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: [true, "Please provide the role id"],
  },
});

const Employee =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
