const express = require('express');
const router = express.Router();

const {
    getAdaptionRequests,
    getAdaptionRequestById,
    createAdaptionRequest,
    updateAdaptionRequest,
    deleteAdaptionRequest
} = require('../controllers/adaptionRequest.controller');

// Route to get all adaptionRequests
router.get('/', getAdaptionRequests);

// Route to get single adaptionRequest
router.get('/:id', getAdaptionRequestById);

// Route to create a adaptionRequest
router.post('/', createAdaptionRequest);

// Route to update a adaptionRequest
router.put('/:id', updateAdaptionRequest);

// Route to delete a adaptionRequest
router.delete('/:id', deleteAdaptionRequest);

export default router;