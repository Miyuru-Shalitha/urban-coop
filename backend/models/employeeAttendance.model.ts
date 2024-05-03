import mongoose from "mongoose";

const employeeAttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, "Please provide an employee ID"],
    unique: false,
  },
  date: {
    type: String,
    required: [true, "Please provide a date"],
    unique: true,
  },
  signIn: {
    type: String,
    unique: false,
  },
  signOut: {
    type: String,
    unique: false,
  },
});

const EmployeeAttendance =
  mongoose.models.employeeAttendance ||
  mongoose.model("employeeAttendance", employeeAttendanceSchema);

export default EmployeeAttendance;
