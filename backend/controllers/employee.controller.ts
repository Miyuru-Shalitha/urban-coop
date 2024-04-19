import { Request, Response } from "express";
// const Employee = require('../models/employee.model');
import connect from "../config/db.config";
import Employee from "../models/employee.model";
import Role from "../models/role.model";

// connect();

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find({}).exec();
    return res.status(200).json(employees);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    return res.status(200).json(employee);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const createEmployee = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, address, roleId } = req.body;
    const foundEmployee = await Employee.findOne({ email });

    if (foundEmployee) {
      return res.status(409).json({ message: "Employee already exists!" });
    }

    await Role.findById(roleId); // If there is no document for the roleId it throws an error

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      address,
      roleId,
    });
    newEmployee.save();
    return res
      .status(201)
      .json({ message: "Employee created successfully", newEmployee });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, address, roleId } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        address,
        roleId,
      },
      { new: true } // { new: true } will returns the updated document.
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    return res
      .status(200)
      .json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    return res.status(204).json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
