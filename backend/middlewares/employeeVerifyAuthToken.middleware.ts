import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const employeeVerifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  try {
    if (req.cookies.token) {
      jwt.verify(req.cookies.token, process.env.TOKEN_SECRET!);
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
      next();
    }
  } catch (error: any) {
    console.error("Error verifying token", error);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export default employeeVerifyAuthToken;
