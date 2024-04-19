import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Employee from "../models/employee.model";
import jwt from "jsonwebtoken";

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

    const tokenData = {
      id: foundEmployee._id,
      firstName: foundEmployee.firstName,
      lastName: foundEmployee.lastName,
      email: foundEmployee.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });

    const employee = {
      _id: foundEmployee._id,
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
