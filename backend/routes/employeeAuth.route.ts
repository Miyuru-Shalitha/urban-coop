import { Router } from "express";
import { logInEmployee } from "../controllers/employeeAuth.controller";

const router = Router();

router.post("/", logInEmployee);

export default router;
