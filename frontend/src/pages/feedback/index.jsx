import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { useFeedbackStore } from "../../store/useFeedbackStore";
import {
  useFeedbackData,
  useFeedbacksByCustomer,
} from "../../hooks/useFeedbackData";
import { confirmMessage } from "../../utils/Alert";
import Toast from "../../utils/toast";
import FeedbackAPI from "../../api/FeedbackAPI";
import AddFeedbackModal from "./AddFeedbackModal";
import EditFeedbackModal from "./EditFeedbackModal";
import { BootstrapTable } from "../../components";
import { generatePDF } from "../../utils/GeneratePDF";
import { IoMdAddCircleOutline, IoMdDownload } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useAuthStore } from "../../store/useAuthStore";
import { USER_ROLES } from "../../constants/roles";

const index = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const { openAddFeedbackModal, openEditFeedbackModal, setSelectedFeedback } =
    useFeedbackStore((state) => ({
      openAddFeedbackModal: state.openAddFeedbackModal,
      openEditFeedbackModal: state.openEditFeedbackModal,
      setSelectedFeedback: state.setSelectedFeedback,
    }));
  let result =
    user.role === USER_ROLES.ADMIN
      ? useFeedbackData()
      : useFeedbacksByCustomer();
  const { data, refetch } = result;

  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("service"); // 'service' or 'comment'

  const filteredFeedbacks = data
    ? data.data.feedbacks.filter((feedback) => {
        return feedback[filterBy].toLowerCase().includes(search.toLowerCase());
      })
    : [];

  const { mutate } = useMutation(FeedbackAPI.deleteFeedback, {
    onSuccess: () => {
      refetch();
      Toast({ type: "success", message: "Feedback deleted successfully" });
    },
    onError: (error) => {
      Toast({ type: "error", message: error?.response?.data?.message });
    },
  });

  const onDelete = (id) => {
    confirmMessage("Are you sure?", "This action cannot be undone.", () => {
      mutate(id);
    });
  };

  const handleEdit = (feedback) => {
    setSelectedFeedback(feedback);
    openEditFeedbackModal();
  };

  const downloadPDF = () => {
    const feedbackCount = data.data.feedbacks.length;
    data.data.feedbacks.forEach((feedback) => {
      feedback.customer = feedback.customer.name;
    });
    const additionalInfo = `Total Feedbacks: ${feedbackCount}`;
    generatePDF(
      additionalInfo,
      ["customer", "rating", "service", "comment"],
      data.data.feedbacks,
      "feedbacks-report"
    );
  };

  const adminColumns = ["Customer", "Rating", "Service", "Comment", "Actions"];
  const customerColumns = ["Rating", "Service", "Comment", "Actions"];

  return (
    <div className="container mt-2">
      <AddFeedbackModal />
      <EditFeedbackModal />

      <h1 className="mb-4">Feedbacks</h1>

      {user.role === USER_ROLES.CUSTOMER && (
        <button
          className="btn mb-4"
          style={{
            backgroundColor: "#E5A700",
            color: "#271520",
            fontWeight: "bold",
          }}
          onClick={openAddFeedbackModal}
        >
          <IoMdAddCircleOutline className="mb-1" /> <span>Give Feedback</span>
        </button>
      )}

      {/* Download PDF report */}
      {user.role === USER_ROLES.ADMIN && (
        <Button variant="success" className="mb-4" onClick={downloadPDF}>
          <IoMdDownload className="mb-1" /> <span>Download Report</span>
        </Button>
      )}

      {/* Search and Filter */}
      <div className="d-flex mb-3">
        <select
          className="form-select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          style={{ width: "auto", marginRight: "8px" }}
        >
          <option value="service">Service</option>
          <option value="comment">Comment</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder={`Search by ${filterBy}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="mt-3">
        <BootstrapTable
          headers={
            user.role === USER_ROLES.ADMIN ? adminColumns : customerColumns
          }
          children={filteredFeedbacks.map((feedback) => (
            <tr key={feedback._id}>
              {user.role === USER_ROLES.ADMIN && (
                <td>{feedback.customer.name}</td>
              )}
              <td>{feedback.rating}</td>
              <td>{feedback.service}</td>
              <td>{feedback.comment}</td>
              <td className="d-flex">
                {user.role === USER_ROLES.CUSTOMER && (
                  <Button
                    className="mx-1 px-2"
                    variant="info"
                    onClick={() => handleEdit(feedback)}
                    size="sm"
                  >
                    <MdEditSquare className="mb-1 mx-1" />
                  </Button>
                )}
                <Button
                  className="mx-1 px-2 d-flex align-items-center"
                  variant="danger"
                  onClick={() => onDelete(feedback._id)}
                  size="sm"
                >
                  <AiTwotoneDelete className="mb-1 mx-1" />
                </Button>
              </td>
            </tr>
          ))}
        />
      </div>
    </div>
  );
};

export default index;
