import { Request, Response, NextFunction } from "express";

function auth(req: Request, res: Response, next: NextFunction) {
  console.log("AUTH");
  next();
}

export default auth;
