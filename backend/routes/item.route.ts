import { Router } from "express";
import { createItem,getAllItemCodes,deleteItemById } from "../controllers/item.controller";


const router = Router();

router.post("/",createItem);
router.get("/",getAllItemCodes);
router.delete("/:id",deleteItemById);


export default router;