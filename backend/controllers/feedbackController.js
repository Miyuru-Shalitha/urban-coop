const Feedback = require("../models/Feedback");
const { z } = require("zod");

const createFeedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  service: z.string(),
  comment: z.string().max(500),
});

const feedbackController = {
  // create feedback
  createFeedback: async (req, res) => {
    try {
      const { rating, service, comment } = req.body;
      const customer = req.userId;

      // validation
      createFeedbackSchema.parse(req.body);

      const newFeedback = new Feedback({
        customer,
        rating,
        service,
        comment,
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
        error,
        message: "Internal server error",
      });
    }
  },

  // get all feedbacks
  getFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find().populate("customer", "-password");

      res.status(200).json({ success: true, feedbacks });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get feedbacks by customer
  getFeedbacksByCustomer: async (req, res) => {
    try {
      const customerId = req.userId;

      const feedbacks = await Feedback.find({ customer: customerId }).populate(
        "customer",
        "-password"
      );

      res.status(200).json({ success: true, feedbacks });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get feedback by id
  getFeedbackById: async (req, res) => {
    try {
      const feedbackId = req.params.id;
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
        error,
        message: "Internal server error",
      });
    }
  },

  // update feedback
  updateFeedback: async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const feedback = await Feedback.findById(feedbackId);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        feedback: updatedFeedback,
        message: "Feedback updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete feedback
  deleteFeedback: async (req, res) => {
    try {
      const feedbackId = req.params.id;

      const feedback = await Feedback.findById(feedbackId);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

      res.status(200).json({
        success: true,
        feedback: deletedFeedback,
        message: "Feedback deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get feedbacks count using aggregation
  getFeedbacksCount: async (req, res) => {
    try {
      const feedbacksCount = await Feedback.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: feedbacksCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get feedbacks count for a specific customer
  getFeedbacksCountByCustomer: async (req, res) => {
    try {
      const customerId = req.userId;

      const feedbacksCount = await Feedback.find({
        customer: customerId,
      }).count();

      res.status(200).json({ success: true, count: feedbacksCount || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = feedbackController;
