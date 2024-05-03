import  { Request, Response } from "express";
import registration from'../models/EventRegisterSchema';
import Event from '../models/eventSchema';


const createReg = async (req: Request, res: Response) => {
 try{
  const{eventId,name,email,mobile,attendees}=req.body;

  const event = await Event.findById(eventId);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  const existingRecord = await registration.findOne({ email });
    if (existingRecord) {
      return res.status(400).json({ message: 'Duplicate entry: This email address is already registered.' });
    }

  const eventName = event.title;

  const newRegistration = new registration({
    eventName,
    eventId,
    name,
    email,
    mobile,
    attendees,
  });
  
  await newRegistration.save();

  res.status(201).json();
}catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};

const getReg = async (req: Request, res: Response) => {
  try {
    const allReg = await registration.find();
    res.status(200).json(allReg);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getone = async (req: Request, res: Response) => {
  try {
    const oneReg = await registration.findById(req.params.id);
    res.status(200).json(oneReg);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateone = async (req: Request, res: Response) => {
  try {
    const updatedRegistration = await registration.findByIdAndUpdate(req.params.id, req.body, { new: true });


    if (!updatedRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error("Error updating registration:", error);
    res.status(500).json({ error: 'Internal server error' });
  }

};

const deleteEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;//why need this

    const event = await registration.findById(eventId);//findById dispaly error
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // If the event exists, delete it
    await registration.findByIdAndDelete(eventId);//findByIdAndDelete display error

    // Return a success message
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export { createReg, getReg, getone, updateone, deleteEventById };

