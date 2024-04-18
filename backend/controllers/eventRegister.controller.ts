import e, { Request, Response } from "express";
import registration from "../models/eventRegisterSchema"

// Create an event
const createReg = async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const event = new registration(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
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
export { createReg , getReg, getone, updateone};