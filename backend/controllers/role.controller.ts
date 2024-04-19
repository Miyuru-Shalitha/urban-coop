import { Request, Response } from "express";
import Role from "../models/role.model";

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().exec();
    res.status(200).json(roles);
  } catch (error: any) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundRole = await Role.findById(id).exec();

    if (!foundRole) {
      return res.status(404).json({ message: "Role not found!" });
    }

    return res.status(200).json({ role: foundRole });
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, baseSalary } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      {
        name,
        baseSalary,
      },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found!" });
    }

    return res.status(200).json({ updatedRole });
  } catch (error: any) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { getRoles, getRole, updateRole };
