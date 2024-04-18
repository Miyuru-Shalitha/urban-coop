import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, getEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);

export default router;
