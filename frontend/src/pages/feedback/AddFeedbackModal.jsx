import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useFeedbackStore } from "../../store/useFeedbackStore";
import {
  useFeedbackData,
  useFeedbacksByCustomer,
} from "../../hooks/useFeedbackData";
import { BootstrapModal } from "../../components";
import FeedbackAPI from "../../api/FeedbackAPI";
import Toast from "../../utils/toast";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const AddFeedbackModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const { isAddFeedbackModalOpen, closeAddFeedbackModal } = useFeedbackStore(
    (state) => ({
      isAddFeedbackModalOpen: state.isAddFeedbackModalOpen,
      closeAddFeedbackModal: state.closeAddFeedbackModal,
    })
  );

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
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Create mutation
  const { mutate } = useMutation(FeedbackAPI.createFeedback, {
    onSuccess: () => {
      // close the modal and refetch the data
      closeAddFeedbackModal();
      refetch();
      Toast({ type: "success", message: "Feedback created successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error.message });
    },
  });

  // Submit function
  const onSubmit = (values) => {
    // convert the rating to a number
    values.rating = parseInt(values.rating);

    // call the mutation
    mutate(values);
    reset();
  };

  return (
    <BootstrapModal
      show={isAddFeedbackModalOpen}
      handleClose={closeAddFeedbackModal}
      title="Give Feedback"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            <option value="">Select Rating</option>
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
          Submit
        </button>
      </form>
    </BootstrapModal>
  );
};

export default AddFeedbackModal;
