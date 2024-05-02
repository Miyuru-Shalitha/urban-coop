import { Router } from "express";
import { logInEmployee } from "../controllers/employeeAuth.controller";
// import employeeVerifyAuthToken from "../middlewares/employeeVerifyAuthToken.middleware";

const router = Router();

// router.get("/", employeeVerifyAuthToken);
router.post("/", logInEmployee);

export default router;
