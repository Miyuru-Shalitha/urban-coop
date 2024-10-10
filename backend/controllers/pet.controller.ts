import { Request, Response } from 'express';
import Pet from '../models/pet.model';
const asyncHandler = require('express-async-handler');


// @desc    Fetch all pets
// @route   GET /api/pets
// @access  Public
exports.getPets = asyncHandler(async (req: Request, res: Response) => {
    const pets = await Pet.find({});
    res.json(pets);
});

// @desc    Fetch single pet
// @route   GET /api/pets/:id
// @access  Public
exports.getPetById = asyncHandler(async (req: Request, res: Response) => {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
        res.json(pet);
    } else {
        res.status(404);
        throw new Error('Pet not found');
    }
});

// @desc    Create a pet
// @route   POST /api/pets
// @access  Private/Admin
exports.createPet = asyncHandler(async (req: Request, res: Response) => {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
});

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private/Admin
exports.updatePet = asyncHandler(async (req: Request, res: Response) => {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
        res.status(404).json({ message: 'Pet not found' });
        return;    
    }
    const updatedFields = {
        imgUrl: req.body.imgUrl || pet.imgUrl,
        name: req.body.name || pet.name,
        age: req.body.age || pet.age,
        species: req.body.species || pet.species,
        breed: req.body.breed || pet.breed,
        gender: req.body.gender || pet.gender,
        color: req.body.color || pet.color,
        adoptionStatus: req.body.adoptionStatus || pet.adoptionStatus,
        description: req.body.description || pet.description,
    };
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updatedPet);
});

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private/Admin
exports.deletePet = asyncHandler(async (req: Request, res: Response) => {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
        res.status(404).json({ message: 'Pet not found' });
        return;    
    }
    await pet.deleteOne();
    res.json({ message: 'Pet removed' });
});
