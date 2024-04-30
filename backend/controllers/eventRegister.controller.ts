import e, { Request, Response } from "express";
import registration from "../models/eventRegisterSchema"
import Event from '../models/eventSchema';

const createReg = async (req: Request, res: Response) => {
  try {

    const { eventId, ...registrationData } = req.body;


    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }


    const event = await Event.findById(eventId);


    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const Registration = new registration({
      eventName: event.title,
      ...registrationData,
    });

    console.log(Registration)
    await Registration.save();

    res.status(201).json(registration);
  } catch (error) {
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