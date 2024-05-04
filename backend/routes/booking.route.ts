import express from 'express';
import bookingController from '../controllers/booking.controller'; // Import the booking controller

// Create a router
const router = express.Router();

// Define routes

// Create a booking
router.post('/', bookingController.createBooking);

// Get bookings for admin approval page
router.get('/for-approval', bookingController.getBookingsForApproval);

// Get all bookings
router.get('/mybookings', bookingController.getAllBookings);

// Get all user bookings
router.get('/userbookings/:userId',bookingController.getBookingsByUserId);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);


// Update booking by ID
router.put('/:id', bookingController.updateBookingById);

// Delete booking by ID
router.delete('/:id', bookingController.deleteBookingById);

// Update online booking by ID
router.put('/online/:id', bookingController.updateOnlineBookingById);

// Delete online booking by ID
router.delete('/online/:id', bookingController.deleteOnlineBookingById);

export default router;
