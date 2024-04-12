import express from "express";
import { createEvent,getAllevents,getEventById,updateEventById,deleteEventById } from "../controllers/Event.controller";

const router = express.Router();

router.post("/create", createEvent);
router.get("/events",getAllevents);
router.get("/event/:id",getEventById);
router.put("/update/:id",updateEventById);
router.delete("/delete/:id",deleteEventById);

export default router;