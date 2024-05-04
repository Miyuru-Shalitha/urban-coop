import { Router } from "express";
import {
  getHourlyRate,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/role.controller";

const router = Router();

router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.post("/hourly-rate", getHourlyRate);

export default router;
