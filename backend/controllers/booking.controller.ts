import { Request, Response } from 'express';
import Booking from '../models/booking.model'; // Import the Booking model

// Booking controller object
const bookingController = {
    // Create a booking
    createBooking: async (req: Request, res: Response) => {
        try {
            const bookingData = req.body;
            const newBooking = new Booking(bookingData);
            const savedBooking = await newBooking.save();
            res.status(201).json(savedBooking);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Get all bookings
    getAllBookings: async (_req: Request, res: Response) => {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Get booking by ID
    getBookingById: async (req: Request, res: Response) => {
        try {
            const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                res.status(404).json({ message: 'Booking not found' });
            } else {
                res.status(200).json(booking);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Update booking by ID
    updateBookingById: async (req: Request, res: Response) => {
        try {
            const bookingId = req.params.id;
            const updatedData = req.body;
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
            if (!updatedBooking) {
                res.status(404).json({ message: 'Booking not found' });
            } else {
                res.status(200).json(updatedBooking);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },

    // Delete booking by ID
    deleteBookingById: async (req: Request, res: Response) => {
        try {
            const bookingId = req.params.id;
            const deletedBooking = await Booking.findByIdAndDelete(bookingId);
            if (!deletedBooking) {
                res.status(404).json({ message: 'Booking not found' });
            } else {
                res.status(200).json({ message: 'Booking deleted successfully' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    },
};

export default bookingController;

