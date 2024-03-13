import { Request, Response } from "express";
// const Employee = require('../models/employee.model');
import connect from "../config/db.config";

// connect();

const getEmployees = async (req: Request, res: Response) => {
  try {
    // const employees = await Employee.find({});
    const employees = [
      {
        id: "sdlfkjsldf",
        name: "David Jones",
      },
      {
        id: "lkjlskdii",
        name: "Harrison",
      },
    ];
    res.status(200).json(employees);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const employee = await Employee.findById(id);
    const employee = {
      id: "sdlfkjsldf",
      name: "David Jones",
    };
    res.status(200).json(employee);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getEmployees, getEmployee };
