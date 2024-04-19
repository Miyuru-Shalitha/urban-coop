import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  feedbacks: [],
  selectedFeedback: null,
  isAddFeedbackModalOpen: false,
  isEditFeedbackModalOpen: false,
  isViewFeedbackModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setFeedbacks: (feedbacks) => set({ feedbacks }),
  setSelectedFeedback: (feedback) =>
    set({ selectedFeedback: feedback }),
  openAddFeedbackModal: () => set({ isAddFeedbackModalOpen: true }),
  closeAddFeedbackModal: () => set({ isAddFeedbackModalOpen: false }),
  openEditFeedbackModal: () => set({ isEditFeedbackModalOpen: true }),
  closeEditFeedbackModal: () => set({ isEditFeedbackModalOpen: false }),
  openViewFeedbackModal: () => set({ isViewFeedbackModalOpen: true }),
  closeViewFeedbackModal: () => set({ isViewFeedbackModalOpen: false }),
});

export const useFeedbackStore = create(devtools(store, "feedbackStore"));
