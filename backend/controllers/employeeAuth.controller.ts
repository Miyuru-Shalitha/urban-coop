import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Employee from "../models/employee.model";
import jwt from "jsonwebtoken";

interface Role {
  _id: string;
  roleId: string;
  name: string;
  baseSalary: string;
}

interface EmployeeCredential {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;
}

// verify token
const authorizeEmployee = async (req: Request, res: Response) => {
  try {
    if (req.cookies.token) {
      jwt.verify(req.cookies.token, process.env.TOKEN_SECRET!);
      return res.status(200).send({ message: "Auhorized" });
    }
  } catch (error: any) {
    console.error("Error verifying token", error);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

const logInEmployee = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundEmployees = await Employee.aggregate([
      {
        $match: { email },
      },
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: {
          path: "$role",
        },
      },
      {
        $limit: 1,
      },
    ]);

    const foundEmployee = foundEmployees[0];

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
      role: foundEmployee.role,
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
      role: foundEmployee.role.name,
    };

    return res
      .status(200)
      .json({ message: "Logged in successfully!", employee });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { logInEmployee, authorizeEmployee };
