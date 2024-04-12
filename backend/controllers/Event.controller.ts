import connect from "../config/db.config";
import { create } from "domain";
import { Request, Response } from "express";
const multer = require("multer");
const EventSchema = require("../models/eventSchema")
// Create an event
    const createEvent = async (req: Request, res: Response) => {
      try {
        const eventData = new EventSchema(req.body); 
        if (!eventData) {
          res.status(400).json({ message: 'Event not created' });
        }
        const saveData = await eventData.save();
        res.status(200).json(saveData);

      } catch (error) {
        res.status(500).json({ error: error })
      }
    }
// Get all events
    const getAllevents = async (req: Request, res: Response) => {

      try {
        const events = await EventSchema.find();
        if(!events) {
          res.status(400).json({ message: 'No events found' });
        }
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: error })
      }

    }

//get event by id
const getEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = await EventSchema.findById(id);
    if(!event) {
      res.status(400).json({ message: 'No event found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
//update event by id  
const updateEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const eventdata = await EventSchema.findById(id);
    if(!eventdata) {
      res.status(400).json({ message: 'No event found' });
    }
    const updatedata = await EventSchema.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(updatedata); 
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
//Delete event by id
const deleteEventById = async(req:Request,res:Response)=>{
  try {
    const id = req.params.id;
    const eventdata = await EventSchema.findById(id);
    if(!eventdata) {
      res.status(400).json({ message: 'No event found' });
    }
    const deletedata = await EventSchema.findByIdAndDelete(id);
    res.status(200).json(deletedata);
  } catch (error) {
    res.status(500).json({error:error})
  }
}

export { createEvent,
  getAllevents
  ,getEventById,
  updateEventById
  ,deleteEventById
 };