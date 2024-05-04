
import { Router } from "express";
import { createStock,getAllStocks,deleteStockById, updateStockById,getStockById } from "../controllers/stock.controller";


const router = Router();


router.post('/',createStock);
router.put('/:id',updateStockById);
router.get('/', getAllStocks);
router.get('/:id',getStockById);
router.delete('/:id', deleteStockById);

export default router;
