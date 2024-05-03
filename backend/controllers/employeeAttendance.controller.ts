import { Request, Response } from "express";
import EmployeeAttendance from "../models/employeeAttendance.model";
import Employee from "../models/employee.model";
import bcrypt from "bcrypt";

const markEmployeeAttendanceSignIn = async (req: Request, res: Response) => {
  try {
    const { employeeId, password, type } = req.body;
    const foundEmployee = await Employee.findOne({ employeeId });

    if (foundEmployee === null) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      foundEmployee.password
    );

    if (!isValidPassword) {
      return res.status(403).json({ message: "Invalid password!" });
    }

    if (type === "sign-in") {
      const now = new Date();

      const employeeAttendance = new EmployeeAttendance({
        employeeId,
        date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
        signIn: `${now.getHours()}:${now.getMinutes()}`,
      });

      await employeeAttendance.save();

      return res
        .status(201)
        .json({ message: "Sign in time recorded successfully" });
    } else if (type === "sign-out") {
      const now = new Date();

      await EmployeeAttendance.updateOne(
        {
          date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
        },
        {
          signOut: `${now.getHours()}:${now.getMinutes()}`,
        }
      );

      return res
        .status(200)
        .json({ message: "Sign out time recorded successfully!" });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { markEmployeeAttendanceSignIn };
