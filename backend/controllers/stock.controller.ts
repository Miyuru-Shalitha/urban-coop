import Stock from "../models/Stock.model";
import { Request, Response } from "express";

// Create stock
const createStock = async (req: Request, res: Response) => {
  try {
    const { date, stockCode, stockBrand, category, quantity, status } = req.body;

    const foundStock = await Stock.findOne({ stockCode: stockCode });
    if (foundStock) {
      return res.status(409).json({ message: "Stock already exists!" });
    }

    const newStock = new Stock({
      date: date,
      stockCode: stockCode,
      stockBrand: stockBrand,
      category: category,
      quantity: quantity,
      status: status
    });
    await newStock.save();

    return res.status(201).json({ message: "Stock created successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all stocks
const getAllStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find();
    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: 'No stocks found' });
    }
    return res.status(200).json(stocks);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get stock by ID
const getStockById = async (req: Request, res: Response) => {
  const stockId = req.params.id;

  try {
    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    return res.status(200).json(stock);
  } catch (error) {
    console.error('Error fetching stock by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update stock by ID
const updateStockById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const stockData = await Stock.findById(id);
    if (!stockData) {
      return res.status(404).json({ message: 'No stock found' });
    }

    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedStock);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete stock by ID
const deleteStockById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const stock = await Stock.findById(id);
    if (!stock) {
      return res.status(404).json({ message: 'No stock found' });
    }

    const deletedStock = await Stock.findByIdAndDelete(id);
    return res.status(200).json(deletedStock);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export {
  createStock,
  getAllStocks,
  updateStockById,
  deleteStockById,
  getStockById
};
