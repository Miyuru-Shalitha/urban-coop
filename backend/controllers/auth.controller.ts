import { Request, Response } from "express";

const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.json({ message: "Hello, world!" });
};

export { logIn };
