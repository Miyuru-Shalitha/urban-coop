import express from "express";
import{createReg,getReg,getone,updateone}  from "../controllers/eventRegister.controller";


const router = express.Router();
router.post("/", createReg);
router.get("/", getReg);
router.get("/:id", getone);
router.put("/:id", updateone);


export default router;


