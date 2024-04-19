import express from "express";
import{createReg,getReg,getone,updateone,deleteEventById}  from "../controllers/eventRegister.controller";


const router = express.Router();
router.post("/", createReg);
router.get("/", getReg);
router.get("/:id", getone);
router.put("/:id", updateone);
router.delete("/:id", deleteEventById);



export default router;


