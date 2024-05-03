import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employee.controller";
import employeeAuth from "../middlewares/employeeVerifyAuthToken.middleware";

const router = Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
