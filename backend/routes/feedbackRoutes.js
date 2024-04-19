const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.CUSTOMER]),
  feedbackController.createFeedback
);
router.get(
  "/",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
  feedbackController.getFeedbacks
);
router.get(
  "/customer",
  authMiddleware([USER_ROLES.CUSTOMER]),
  feedbackController.getFeedbacksByCustomer
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.ADMIN]),
  feedbackController.getFeedbacksCount
);
router.get(
  "/count/customer",
  authMiddleware([USER_ROLES.CUSTOMER]),
  feedbackController.getFeedbacksCountByCustomer
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
  feedbackController.getFeedbackById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.CUSTOMER]),
  feedbackController.updateFeedback
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER]),
  feedbackController.deleteFeedback
);

module.exports = router;
