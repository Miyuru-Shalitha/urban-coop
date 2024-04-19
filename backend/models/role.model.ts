import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the role name"],
    unique: true,
  },
  baseSalary: {
    type: Number,
    required: [true, "Please provide the base salary"],
    unique: false,
  },
});

const Role = mongoose.models.roles || mongoose.model("roles", roleSchema);

export default Role;
