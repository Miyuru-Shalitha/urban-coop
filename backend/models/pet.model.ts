import { Document, Schema, model } from 'mongoose';

interface IPet extends Document {
    imgUrl: string;
    name: string;
    age: number;
    species: string;
    breed: string;
    gender: 'Male' | 'Female' | 'Unknown';
    color: string;
    adoptionStatus: 'Available' | 'Adopted' | 'Pending';
    description: string;
}

const petSchema = new Schema({
    imgUrl: {
        type: String,
        required: [true, 'Please provide the image URL'],
    },
    name: {
        type: String,
        required: [true, 'Please provide the name'],
    },
    age: {
        type: Number,
        required: [true, 'Please provide the age'],
    },
    species: {
        type: String,
        required: [true, 'Please provide the species'],
    },
    breed: {
        type: String,
        required: [true, 'Please provide the breed'],
    },
    gender: {
        type: String,
        required: [true, 'Please provide the gender'],
        enum: ['Male', 'Female', 'Unknown']
    },
    color: {
        type: String,
        required: [true, 'Please provide the color'],
    },
    adoptionStatus: {
        type: String,
        required: [true, 'Please provide the adoption status'],
        enum: ['Available', 'Adopted', 'Pending']
    },
    description: {
        type: String,
        required: [true, 'Please provide the description'],
    },
},
    {
        timestamps: true,
    }
);

const Pet = model<IPet>('Pet', petSchema);

export default Pet;