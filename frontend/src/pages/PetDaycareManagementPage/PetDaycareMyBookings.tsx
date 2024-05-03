import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const PetDaycareMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const deleteBooking = async () => {
    if (bookingToDelete) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/bookings/online/${bookingToDelete}`);
            if (response.status === 200) {
                toast.success('Booking deleted successfully!');
                setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingToDelete));
                closeConfirmModal();
            } else {
                toast.error('Failed to delete booking. Please try again later.');
            }
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Check if there is a response from the server
                if (error.response) {
                    // Display the error message from the backend
                    toast.error(error.response.data.message || 'An error occurred while deleting the booking. Please try again later.');
                } else {
                    // No response from server, display generic message
                    toast.error('An error occurred while deleting the booking. Please try again later.');
                }
            } else {
                // Handle non-Axios errors
                console.error('Error deleting booking:', error);
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    }
};


  function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const openConfirmModal = (bookingId) => {
    setBookingToDelete(bookingId);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setBookingToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 mt-8 mb-8 border-2 rounded-2xl">
      <div className="w-full mx-auto p-8 font-sans">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left w-1/6">Name</th>
                <th className="px-4 py-2 text-left w-1/6">Contact Number</th>
                <th className="px-4 py-2 text-left w-1/6">Start Date</th>
                <th className="px-4 py-2 text-left w-1/6">End Date</th>
                <th className="px-4 py-2 text-left w-1/6">Pet Type</th>
                <th className="px-4 py-2 text-left w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-4 py-2">{booking.customerName}</td>
                    <td className="px-4 py-2">{booking.contactNumber}</td>
                    <td className="px-4 py-2">{formatDate(booking.startDate)}</td>
                    <td className="px-4 py-2">{formatDate(booking.endDate)}</td>
                    <td className="px-4 py-2">{booking.petType}</td>
                    <td className="px-4 py-2 flex flex-col sm:flex-row gap-2 sm:gap-2 sm:justify-start sm:items-center">
                      {/* Eye Button */}
                      <button onClick={() => openModal(booking)} className="bg-primaryAccent text-black px-3 py-1 rounded">
                        <i className="fas fa-eye"></i>
                      </button>

                      {/* Update Button */}
                      <Link to={`update/${booking._id}`} className="bg-primaryAccent text-black px-3 py-1 rounded">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>

                      {/* Delete Button */}
                      <button onClick={() => openConfirmModal(booking._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-2/3 md:w-1/2">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Booking Details</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div>
                <p className="py-2"><strong>Name:</strong> {selectedBooking.customerName}</p>
                <p className="py-1"><strong>Contact Number:</strong> {selectedBooking.contactNumber}</p>
                <p className="py-1"><strong>Email:</strong> {selectedBooking.email}</p>
                <p className="py-1"><strong>Start Date:</strong> {formatDate(selectedBooking.startDate)}</p>
                <p className="py-1"><strong>End Date:</strong> {formatDate(selectedBooking.endDate)}</p>
                <p className="py-1"><strong>Pet Name:</strong> {selectedBooking.petName}</p>
                <p className="py-1"><strong>Pet Type:</strong> {selectedBooking.petType}</p>
                <p className="py-1"><strong>Description:</strong> {selectedBooking.description}</p>
                <p className="py-1"><strong>Total Estimated Price:</strong> Rs: {selectedBooking.total}/=</p>
              </div>

              {/* Modal Footer */}
              <div className="mt-4">
                <button onClick={closeModal} className="bg-primaryAccent text-black px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-2/3 md:w-1/2">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Confirm Deletion</h2>
                <button onClick={closeConfirmModal} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div>
                <p>Are you sure you want to delete this booking?</p>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={deleteBooking}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes, delete
                </button>
                <button
                  onClick={closeConfirmModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDaycareMyBookings;
