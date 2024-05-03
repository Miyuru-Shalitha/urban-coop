import { Router } from "express";
import {
  getEmployeeAttendance,
  markEmployeeAttendanceSignIn,
} from "../controllers/employeeAttendance.controller";

const router = Router();

router.get("/:id", getEmployeeAttendance);
router.post("/", markEmployeeAttendanceSignIn);

export default router;
