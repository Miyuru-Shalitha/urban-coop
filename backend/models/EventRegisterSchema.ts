import mongoose from "mongoose";

const eventRegisterSchema = new mongoose.Schema({
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
        unique: true
        ,
    },
    mobile: {
        type: String,
        required: [true, "Please provide the mobile number"],
        unique: false,
    },
    attendees: {
        type: Number,
        required: [true, "Please provide the number of atendees"],
        unique: false,
    },
    });

    const EventRegister = mongoose.models.eventRegister || mongoose.model("eventRegister", eventRegisterSchema);
    export default EventRegister;