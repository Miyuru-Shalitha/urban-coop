import { Request, Response } from "express";
import Booking from "../models/booking.model"; // Import the Booking model

// Booking controller object
const bookingController = {
  // Create a booking
  createBooking: async (req: Request, res: Response) => {
    try {
        // Unpack the booking data directly from req.body
        const bookingData = req.body;
        console.log("BK DATA:",bookingData);

        // Create a new booking with the booking data
        const newBooking = new Booking(bookingData);
        console.log("newbk",newBooking);

        // Save the new booking in the database
        const savedBooking = await newBooking.save();

        console.log(newBooking);
        
        
        // Respond with the saved booking and a 201 status code
        res.status(201).json(savedBooking);
    } catch (error: unknown) {
        // Handle any errors that may occur
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
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
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  // Get booking by ID
  getBookingById: async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        res.status(404).json({ message: "Booking not found" });
      } else {
        res.status(200).json(booking);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  // Update booking by ID
  updateBookingById: async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.id;
      const updatedData = req.body;

      // Find the booking by ID and update with the new data
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        updatedData,
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.status(200).json(updatedBooking);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  // Delete booking by ID
  deleteBookingById: async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.id;
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);
      if (!deletedBooking) {
        res.status(404).json({ message: "Booking not found" });
      } else {
        res.status(200).json({ message: "Booking deleted successfully" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  getBookingsForApproval: async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Find bookings where the approval status is neither "approved" nor "denied"
      const bookings = await Booking.find({
        approvalStatuse: { $nin: ["approved", "denied"] },
      });

      // Respond with the filtered bookings
      res.status(200).json(bookings);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  // Update online booking by ID
  updateOnlineBookingById: async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.id;
      const updatedData = req.body;

      // Find the booking by ID
      const booking = await Booking.findById(bookingId);

      console.log(booking);
      

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Check if the booking status is "approved" or "denied"
      if (
        booking.approvalStatuse === "approved" ||
        booking.approvalStatuse === "denied"
      ) {
        
        return res
          .status(403)
          .json({ message: "Cannot edit approved or denied bookings" });
      } else {
        // Update the booking with the new data
        const updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          updatedData,
          { new: true }
        );
        res.status(200).json(updatedBooking);

      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },
// Delete booking by ID if status is pending
deleteOnlineBookingById: async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);

        console.log(booking.approvalStatuse);
        

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.approvalStatuse !== "Pending") {
            return res.status(403).json({ message: "Your booking has been and cannot be canceled." }); ////updateeee thissssssss
        }

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            res.status(404).json({ message: "Booking not found" });
        } else {
            res.status(200).json({ message: "Booking deleted successfully" });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
},
// Get bookings by user ID
getBookingsByUserId: async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        
        const bookings = await Booking.find({ userId: userId });
        res.status(200).json(bookings);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
},



};

export default bookingController;
