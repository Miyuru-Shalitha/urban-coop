import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Employee from "../models/employee.model";
import jwt from "jsonwebtoken";

interface EmployeeCredential {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
}

// verify token
const authorizeEmployee = async (req: Request, res: Response) => {
  const tokenData: EmployeeCredential = jwt.verify(
    req.cookies.token,
    process.env.TOKEN_SECRET!
  ) as any;
  const tokenDataToSend: EmployeeCredential = {
    _id: tokenData._id,
    employeeId: tokenData.employeeId,
    firstName: tokenData.firstName,
    lastName: tokenData.lastName,
    email: tokenData.email,
  };
};

const logInEmployee = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundEmployee = await Employee.findOne({ email });

    if (!foundEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      foundEmployee.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const tokenData: EmployeeCredential = {
      _id: foundEmployee._id,
      employeeId: foundEmployee.employeeId,
      firstName: foundEmployee.firstName,
      lastName: foundEmployee.lastName,
      email: foundEmployee.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });

    const employee: EmployeeCredential = {
      _id: foundEmployee._id,
      employeeId: foundEmployee.employeeId,
      firstName: foundEmployee.firstName,
      lastName: foundEmployee.lastName,
      email: foundEmployee.email,
    };

    return res
      .status(200)
      .json({ message: "Logged in successfully!", employee });
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { logInEmployee };
