import { Router } from "express";
import { getRole, getRoles, updateRole } from "../controllers/role.controller";

const router = Router();

router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);

export default router;
