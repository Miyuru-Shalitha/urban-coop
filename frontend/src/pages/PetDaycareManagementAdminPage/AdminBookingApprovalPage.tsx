import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
    _id: string;
    customerName: string;
    petName: string;
    approvalStatuse: string;
    [key: string]: any; // Allow additional properties as needed
}

const AdminBookingApprovalPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        // Fetch bookings from the API
        axios.get<Booking[]>(`http://localhost:5000/api/bookings/for-approval`)
            .then(response => {
                console.log(response.data); // Log the data to verify
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    }, []);

    const handleApprovalChange = (bookingId: string, newStatus: string) => {
        // Update approval status on the server
        axios.put(`http://localhost:5000/api/bookings/${bookingId}`, { approvalStatuse: newStatus })
            .then(() => {
                // After successful update, remove the booking from the list
                setBookings(bookings.filter(booking => booking._id !== bookingId));
            })
            .catch(error => {
                console.error('Error updating approval status:', error);
            });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Booking Approval</h1>
            <ul className="space-y-6">
                {bookings.map(booking => (
                    <li key={booking._id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Customer Name: {booking.customerName}</span>
                            <span className="text-lg font-semibold">Pet Name: {booking.petName}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-600">Current Status: <span className={`font-bold ${booking.approvalStatuse === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                                {booking.approvalStatuse}
                            </span></span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleApprovalChange(booking._id, 'approved')}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleApprovalChange(booking._id, 'denied')}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBookingApprovalPage;
