import { Router } from "express";
import { UserRegister } from "../controllers/UserRegister.controller";

const router = Router();

router.post("/", UserRegister);

export default router;