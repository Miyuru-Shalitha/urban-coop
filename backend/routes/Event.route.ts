import express from "express";
import { upload } from "../middlewares/multerConfig";
import { createEvent, getAllevents, getEventById, updateEventById, deleteEventById } from "../controllers/event.controller";

const router = express.Router();


// Routes
router.post("/",upload.single('image'),createEvent); 
router.get("/", getAllevents);
router.get("/:id",upload.single('image'), getEventById);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);

export default router;
