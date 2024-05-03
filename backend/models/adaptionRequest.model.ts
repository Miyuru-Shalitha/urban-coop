import mongoose, { Document, Schema, model } from 'mongoose';

interface IAdaptionRequest extends Document {
    petId: string;
    petName: string;
    requesterName: string;
    requesterEmail: string;
    requesterPhone: string;
    requesterAddress: string;
    requesterPetExperience: string;
    reasonForAdoption: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

const adaptionRequestSchema = new Schema({
    petId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: [true, 'Please provide the pet ID'],
    },
    petName: {
        type: String,
        required: [true, 'Please provide the pet name'],
    },
    requesterName: {
        type: String,
        required: [true, 'Please provide the requester name'],
    },
    requesterEmail: {
        type: String,
        required: [true, 'Please provide the requester email'],
    },
    requesterPhone: {
        type: String,
        required: [true, 'Please provide the requester phone'],
    },
    requesterAddress: {
        type: String,
        required: [true, 'Please provide the requester address'],
    },
    requesterPetExperience: {
        type: String,
        required: [true, 'Please provide the requester pet experience'],
    },
    reasonForAdoption: {
        type: String,
        required: [true, 'Please provide the reason for adoption'],
    },
    status: {
        type: String,
        required: [true, 'Please provide the status'],
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
},
    {
        timestamps: true,
    }
);

const AdaptionRequest = model<IAdaptionRequest>('AdaptionRequest', adaptionRequestSchema);

export default AdaptionRequest;


