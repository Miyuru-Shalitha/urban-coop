import express from 'express';
import bookingController from '../controllers/booking.controller'; // Import the booking controller

// Create a router
const router = express.Router();

// Define routes

// Create a booking
router.post('/bookings', bookingController.createBooking);

// Get all bookings
router.get('/bookings', bookingController.getAllBookings);

// Get booking by ID
router.get('/bookings/:id', bookingController.getBookingById);

// Update booking by ID
router.put('/bookings/:id', bookingController.updateBookingById);

// Delete booking by ID
router.delete('/bookings/:id', bookingController.deleteBookingById);

export default router;
