// feedbackController.ts
import { Request, Response } from "express";
import Feedback from "../models/Feedback";

const feedbackController = {
  // Create feedback
  createFeedback: async (req: Request, res: Response) => {
    try {
      const { customer, rating, service, comment, status } = req.body;

      const newFeedback = new Feedback({
        customer,
        rating,
        service,
        comment,
        status,
      });

      const savedFeedback = await newFeedback.save();

      res.status(201).json({
        success: true,
        feedback: savedFeedback,
        message: "Feedback created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  // Get all feedback
  getAllFeedback: async (_req: Request, res: Response) => {
    try {
      const feedbacks = await Feedback.find().populate("customer", "-password");

      res.status(200).json({ success: true, feedbacks });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  // Get feedback by ID
  getFeedbackById: async (req: Request, res: Response) => {
    try {
      const feedbackId = req.params.id as string;
      const feedback = await Feedback.findById(feedbackId).populate(
        "customer",
        "-password"
      );

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({ success: true, feedback });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  // Update feedback
  updateFeedbackById: async (req: Request, res: Response) => {
    try {
      const feedbackId = req.params.id as string;

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedFeedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({
        success: true,
        feedback: updatedFeedback,
        message: "Feedback updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  // Delete feedback by ID
  deleteFeedbackById: async (req: Request, res: Response) => {
    try {
      const feedbackId = req.params.id as string;

      const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

      if (!deletedFeedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({
        success: true,
        feedback: deletedFeedback,
        message: "Feedback deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  // Approve feedback by ID
  approveFeedbackById: async (req: Request, res: Response) => {
    try {
      const feedbackId = req.params.id as string;

      // Update the feedback status to "approved"
      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { status: "approved" },
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({
        success: true,
        feedback: updatedFeedback,
        message: "Feedback approved successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  // Deny feedback by ID
  denyFeedbackById: async (req: Request, res: Response) => {
    try {
      const feedbackId = req.params.id as string;

      // Update the feedback status to "denied"
      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { status: "denied" },
        { new: true }
      );

      if (!updatedFeedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({
        success: true,
        feedback: updatedFeedback,
        message: "Feedback denied successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  },


};

export default feedbackController;
