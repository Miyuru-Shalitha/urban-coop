const mongoose = require('mongoose');


//model
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email:{
        type:String,
        required:true
    },

    contact:{
        type:String,
        required:true
    },

    feedback:{
        type:String,
        required:true
    },


}, {
    timestamps: true
})

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
