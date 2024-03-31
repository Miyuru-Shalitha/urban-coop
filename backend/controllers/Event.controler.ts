// import { Request, Response } from 'express';
// import Event from '../models/Event';

// // Create a new event
// export const createEvent = async (req: Request, res: Response) => {
//     try {
//         const { title, description, date } = req.body;

//         const event = new Event({
//             title,
//             description,
//             date,
//         });

//         const savedEvent = await event.save();

//         res.status(201).json(savedEvent);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while creating the event' });
//     }
// };

// // Get all events
// export const getAllEvents = async (req: Request, res: Response) => {
//     try {
//         const events = await Event.find();

//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while retrieving the events' });
//     }
// };

// // Get a single event by ID
// export const getEventById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const event = await Event.findById(id);

//         if (!event) {
//             return res.status(404).json({ error: 'Event not found' });
//         }

//         res.json(event);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while retrieving the event' });
//     }
// };

// // Update an event by ID
// export const updateEvent = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { title, description, date } = req.body;

//         const updatedEvent = await Event.findByIdAndUpdate(
//             id,
//             {
//                 title,
//                 description,
//                 date,
//             },
//             { new: true }
//         );

//         if (!updatedEvent) {
//             return res.status(404).json({ error: 'Event not found' });
//         }

//         res.json(updatedEvent);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while updating the event' });
//     }
// };

// // Delete an event by ID
// export const deleteEvent = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const deletedEvent = await Event.findByIdAndDelete(id);

//         if (!deletedEvent) {
//             return res.status(404).json({ error: 'Event not found' });
//         }

//         res.json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while deleting the event' });
//     }
// };

import { Request, Response } from "express";

class EventController {
  getEvents(req: Request, res: Response): void {
    res.json({ message: 'Get Events' });
  }

  getEventById(req: Request, res: Response): void {
    const eventId = req.params.id;
    res.json({ message: `Get Event by ID: ${eventId}` });
  }

  postEvent(req: Request, res: Response): void {
    res.json({ message: 'Post Event' });
  }

  deleteEvent(req: Request, res: Response): void {
    res.json({ message: 'Delete Event' });
  }

  updateEvent(req: Request, res: Response): void {
    const eventId = req.params.id;
    res.json({ message: `Update Event: ${eventId}` });
  }
}

export default new EventController();