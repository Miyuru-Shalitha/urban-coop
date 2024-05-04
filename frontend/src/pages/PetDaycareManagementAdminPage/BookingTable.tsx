import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import GenerateReportButton from '../PetDaycareManagementAdminPage/MyBookingsReport'; // Import your component

const PetDaycareMyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings/mybookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, []);

    function formatDate(isoDateString: string): string {
        const date = new Date(isoDateString);
        return date.toISOString().split('T')[0]; // Extract the date part in the format YYYY-MM-DD
    }

    // Filter the bookings based on the search query
    const filteredBookings = bookings.filter((booking: any) => {
        return (
            booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.contactNumber.includes(searchQuery) ||
            formatDate(booking.startDate).includes(searchQuery) ||
            formatDate(booking.endDate).includes(searchQuery) ||
            booking.petType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.petName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const openModal = (booking: any) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    // Function to handle deleting a booking
    const handleDelete = async (bookingId: string) => {
        try {
            // Send DELETE request to the backend
            const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);

            // If deletion is successful, update the state
            if (response.status === 200) {
                // Filter out the deleted booking from the list
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== bookingId)
                );
                toast.success('Booking deleted successfully!');
            } else {
                toast.error('Failed to delete booking.');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            toast.error('An error occurred while deleting the booking.');
        }
    };

    return (
        <div className="w-full mx-auto p-8 font-sans">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Pet Daycare Bookings</h1>
                <GenerateReportButton bookings={bookings} />
            </div>

            {/* Search bar */}
            <input
                type="text"
                className="mb-4 p-2 border rounded w-full"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Contact Number</th>
                            <th className="px-4 py-2 text-left">Start Date</th>
                            <th className="px-4 py-2 text-left">End Date</th>
                            <th className="px-4 py-2 text-left">Pet Type</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-4 py-2">{booking.customerName}</td>
                                    <td className="px-4 py-2">{booking.contactNumber}</td>
                                    <td className="px-4 py-2">{formatDate(booking.startDate)}</td>
                                    <td className="px-4 py-2">{formatDate(booking.endDate)}</td>
                                    <td className="px-4 py-2">{booking.petType}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        {/* Eye Button */}
                                        <button
                                            onClick={() => openModal(booking)}
                                            className="bg-primaryAccent text-black px-3 py-1 rounded"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
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
                        <div className="py-2">
                            <p className="py-2"><strong>Name:</strong> {selectedBooking.customerName}</p>
                            <p className="py-1"><strong>Contact Number:</strong> {selectedBooking.contactNumber}</p>
                            <p className="py-1"><strong>Email:</strong> {selectedBooking.email}</p>
                            <p className="py-1"><strong>Start Date:</strong> {formatDate(selectedBooking.startDate)}</p>
                            <p className="py-1"><strong>End Date:</strong> {formatDate(selectedBooking.endDate)}</p>
                            <p className="py-1"><strong>Pet Name:</strong> {selectedBooking.petName}</p>
                            <p className="py-1"><strong>Pet Type:</strong> {selectedBooking.petType}</p>
                            <p className="py-1"><strong>Description:</strong> {selectedBooking.description}</p>
                            <p className="py-1"><strong>Total Estimated Price: </strong> Rs:{selectedBooking.total}/=</p>
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
        </div>
    );
};

export default PetDaycareMyBookings;
