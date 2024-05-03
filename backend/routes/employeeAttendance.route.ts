import { Router } from "express";
import { markEmployeeAttendanceSignIn } from "../controllers/employeeAttendance.controller";

const router = Router();

router.post("/", markEmployeeAttendanceSignIn);

export default router;
