import { useQuery } from "@tanstack/react-query";
import FeedbackAPI from "../api/FeedbackAPI";

export const useFeedbackData = () => {
  return useQuery(["feedbacks"], () => FeedbackAPI.getFeedbacks());
};

export const useFeedbacksByCustomer = () => {
  return useQuery(["feedbacksByCustomer"], () =>
    FeedbackAPI.getFeedbacksByCustomer()
  );
};

export const useFeedbackCount = () => {
  return useQuery(["feedbackCount"], () => FeedbackAPI.getFeedbacksCount());
};

export const useFeedback = (id) => {
  return useQuery(["feedback", id], () => FeedbackAPI.getFeedbackById(id));
};

export const useFeedbackCountByCustomer = () => {
  return useQuery(["feedbackCountByCustomer"], () =>
    FeedbackAPI.getFeedbacksCountByCustomer()
  );
};
