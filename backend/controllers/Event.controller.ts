import { Request, Response } from "express";
const EventSchema= require('../models/eventSchema')

// Create an event
const createEvent = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const eventData = req.body;
    const image = req.file.path;

    const event = new EventSchema({ ...eventData, image });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
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