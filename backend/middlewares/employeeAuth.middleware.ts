import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function employeeAuth(req: Request, res: Response, next: NextFunction) {
  try {
    jwt.verify(req.cookies.token, process.env.TOKEN_SECRET!);
    next();
  } catch (error: any) {
    console.error("Error verifying token", error);
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export default employeeAuth;
