import express from "express";
import{createReg,getReg,updateone,deleteEventById,geteventsByUserId}  from "../controllers/eventRegister.controller";


const router = express.Router();
router.post("/", createReg);
router.get("/", getReg);
router.get("/:userId",geteventsByUserId);
router.put("/:id", updateone);
router.delete("/:id", deleteEventById);

 
  

export default router;


