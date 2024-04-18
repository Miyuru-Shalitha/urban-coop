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

export { getRoles };
