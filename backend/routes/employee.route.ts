import { Router } from "express";
import { getEmployees, getEmployee } from "../controllers/employee.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, getEmployees);
router.get("/:id", getEmployee);

export default router;
