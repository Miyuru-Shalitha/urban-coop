import express from 'express';
import bookingController from '../controllers/booking.controller'; // Import the booking controller

// Create a router
const router = express.Router();

// Define routes

// Create a booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Update booking by ID
router.put('/:id', bookingController.updateBookingById);

// Delete booking by ID
router.delete('/:id', bookingController.deleteBookingById);

export default router;
