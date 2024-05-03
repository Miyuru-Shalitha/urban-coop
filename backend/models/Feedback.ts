import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
      },
      service: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
        maxlength: 500, // Limit comment length
      },
      status: {
        type: String,
        required: true,
      }
      
      
      
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
