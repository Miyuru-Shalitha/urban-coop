import { Router } from "express";
import { logInEmployee } from "../controllers/employeeAuth.controller";
import employeeAuth from "../middlewares/employeeAuth.middleware";

const router = Router();

router.get("/", employeeAuth);
router.post("/", employeeAuth, logInEmployee);

export default router;
