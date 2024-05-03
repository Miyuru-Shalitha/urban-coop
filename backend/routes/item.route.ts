import { Router } from "express";
import { createItem,getAllItemCodes,deleteItemById, updateItemById,getItemById } from "../controllers/item.controller";


const router = Router();

router.post("/",createItem);
router.put("/:id",updateItemById);
router.get("/",getAllItemCodes);
router.get("/:id",getItemById);
router.delete("/:id",deleteItemById);


export default router;