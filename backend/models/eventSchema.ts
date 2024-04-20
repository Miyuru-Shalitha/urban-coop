import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  maxParticipation: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Define the model with the name 'Event'
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
