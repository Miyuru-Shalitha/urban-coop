import  { Request, Response } from "express";
import registration from'../models/EventRegisterSchema';
import Event from '../models/eventSchema';
import { error } from "console";

// const createReg = async (req: Request, res: Response) => {
//   try {
//     // Destructure eventId from req.body and collect remaining properties in registrationData
//     const { eventId, ...registrationData } = req.body;

//     // Check if eventId exists
//     if (!eventId) {
//       return res.status(400).json({ error: 'Event ID is required' });
//     }

//     // Find event by eventId
//     const event = await Event.findById(eventId);
//     console.log("Event data",event);
//     // Check if event exists
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     // Create a new registration document with event name and additional registration data
//     const Registration = new registration({
//       eventName: event.title, // Assign the event title to the eventName field
//       ...registrationData,   // Spread other registration data from registrationData
//     });
//     console.log("data base",Registration);
//     // Save the new registration document to the database
//     await Registration.save();

//     // Send a success response with the created registration data
//     res.status(201).json(Registration);
//   } catch (error) {
//     // Handle errors
//     console.error('Error creating registration:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
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

