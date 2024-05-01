import express from 'express';
import feedbackController from '../controllers/feedback.controller';

const router = express.Router();

// Create feedback
router.post('/', feedbackController.createFeedback);

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Get feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Update feedback by ID
router.put('/:id', feedbackController.updateFeedbackById);

// Delete feedback by ID
router.delete('/:id', feedbackController.deleteFeedbackById);

// Approve feedback by ID
router.patch('/:id/approve', feedbackController.approveFeedbackById);

// Deny feedback by ID
router.patch('/:id/deny', feedbackController.denyFeedbackById);



export default router;
