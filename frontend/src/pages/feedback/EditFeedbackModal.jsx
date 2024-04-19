import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useFeedbackStore } from "../../store/useFeedbackStore";
import {
  useFeedbackData,
  useFeedbacksByCustomer,
} from "../../hooks/useFeedbackData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import FeedbackAPI from "../../api/FeedbackAPI";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const EditFeedbackModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const { isEditFeedbackModalOpen, closeEditFeedbackModal, selectedFeedback } =
    useFeedbackStore((state) => ({
      isEditFeedbackModalOpen: state.isEditFeedbackModalOpen,
      closeEditFeedbackModal: state.closeEditFeedbackModal,
      selectedFeedback: state.selectedFeedback,
    }));

  // Get refetch function from react-query hook
  let result;
  if (user.role === USER_ROLES.ADMIN) {
    result = useFeedbackData();
  } else {
    result = useFeedbacksByCustomer();
  }
  const { refetch } = result;

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(FeedbackAPI.updateFeedback, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditFeedbackModal();
      Toast({ type: "success", message: "Feedback updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedFeedback._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedFeedback changes
    if (selectedFeedback) {
      setValue("service", selectedFeedback.service);
      setValue("rating", selectedFeedback.rating);
      setValue("comment", selectedFeedback.comment);
    }
  }, [selectedFeedback, setValue]);

  return (
    <BootstrapModal
      show={isEditFeedbackModalOpen}
      handleClose={closeEditFeedbackModal}
      title={`Edit: ${selectedFeedback?.service} Feedback`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Service */}
        <div className="form-group">
          <label className="my-2" htmlFor="service">
            Service
          </label>
          <input
            type="text"
            className="form-control"
            id="service"
            name="service"
            {...register("service", { required: true })}
          />
          {errors.service && (
            <small className="form-text text-danger">Service is required</small>
          )}
        </div>

        {/* Star Rating */}
        <div className="form-group">
          <label className="my-2" htmlFor="rating">
            Rating
          </label>
          <select
            className="form-control"
            id="rating"
            name="rating"
            {...register("rating", { required: true })}
          >
            <option value="">Select a rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          {errors.rating && (
            <small className="form-text text-danger">Rating is required</small>
          )}
        </div>

        {/* Comment */}
        <div className="form-group">
          <label className="my-2" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            {...register("comment", { required: true })}
          ></textarea>
          {errors.comment && (
            <small className="form-text text-danger">Comment is required</small>
          )}
        </div>

        <button
          type="submit"
          className="btn mt-3"
          style={{ backgroundColor: "#271520", color: "#fff" }}
        >
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditFeedbackModal;
