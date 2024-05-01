import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employee.controller";
import employeeAuth from "../middlewares/employeeAuth.middleware";

const router = Router();

router.get("/", employeeAuth, getEmployees);
router.get("/:id", employeeAuth, getEmployee);
router.post("/", employeeAuth, createEmployee);
router.put("/:id", employeeAuth, updateEmployee);
router.delete("/:id", employeeAuth, deleteEmployee);

export default router;
