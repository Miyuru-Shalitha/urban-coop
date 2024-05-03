import mongoose, { Document } from "mongoose";

interface EventRegister extends Document {
    eventName: string;
    eventId: string;
    name: string;
    email: string;
    mobile: string;
    attendees: number;
}

const eventRegisterSchema = new mongoose.Schema<EventRegister>({
    eventName: {
        type: String,
        required: [true, "Please provide event name"],
    },
    eventId: {
        type: String,
        required: [true, "Please provide the event id"],
    },
    name: {
        type: String,
        required: [true, "Please provide the user name"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true,
    },
    mobile: {
        type: String,
        required: [true, "Please provide the mobile number"],
        unique: false,
    },
    attendees: {
        type: Number,
        required: [true, "Please provide the number of attendees"],
        unique: false,
    },
});

const EventRegisterModel = mongoose.models.eventRegister || mongoose.model<EventRegister>("eventRegister", eventRegisterSchema);

export default EventRegisterModel;
