import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    petType: {
        type: String,
        required: true
    }
});

const Booking =
  mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default Booking;
