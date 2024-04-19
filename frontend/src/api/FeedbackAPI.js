import api from "./api";

class FeedbackAPI {
  // Create feedback
  static createFeedback(data) {
    return api.post("/api/feedbacks", data);
  }

  // Get all feedbacks
  static getFeedbacks() {
    return api.get("/api/feedbacks");
  }

  // Get feedbacks by customer
  static getFeedbacksByCustomer() {
    return api.get("/api/feedbacks/customer");
  }

  // Get feedback by id
  static getFeedbackById(id) {
    return api.get(`/api/feedbacks/${id}`);
  }

  // Update feedback
  static updateFeedback(values) {
    const { id, data } = values;
    return api.patch(`/api/feedbacks/${id}`, data);
  }

  // Delete feedback
  static deleteFeedback(id) {
    return api.delete(`/api/feedbacks/${id}`);
  }

  // Get feedbacks count
  static getFeedbacksCount() {
    return api.get("/api/feedbacks/count");
  }

  // Get feedbacks count by customer
  static getFeedbacksCountByCustomer() {
    return api.get("/api/feedbacks/count/customer");
  }
}

export default FeedbackAPI;
