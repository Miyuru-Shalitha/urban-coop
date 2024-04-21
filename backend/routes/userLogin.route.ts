import { Router } from "express";
import { UserLogin } from "../controllers/UserLogin.controller";

const router = Router();

router.post("/", UserLogin);

export default router;