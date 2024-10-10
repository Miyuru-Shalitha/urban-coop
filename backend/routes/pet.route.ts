const express = require('express');
const router = express.Router();

const {
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
} = require('../controllers/pet.controller');

// Route to get all pets
router.get('/', getPets);

// Route to get single pet
router.get('/:id', getPetById);

// Route to create a pet
router.post('/', createPet);

// Route to update a pet
router.put('/:id', updatePet);

// Route to delete a pet
router.delete('/:id', deletePet);

export default router;