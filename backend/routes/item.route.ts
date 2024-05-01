import { Router } from "express";
import { createItem,getAllItemCodes,deleteItemById, updateItemById } from "../controllers/item.controller";


const router = Router();

router.post("/",createItem);
router.get("/",getAllItemCodes);
router.put("/:id",updateItemById);
router.delete("/:id",deleteItemById);


export default router;