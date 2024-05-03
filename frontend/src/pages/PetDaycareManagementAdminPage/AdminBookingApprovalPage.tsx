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
            .then(response => {
                // After successful update, remove the booking from the list
                setBookings(bookings.filter(booking => booking._id !== bookingId));
            })
            .catch(error => {
                console.error('Error updating approval status:', error);
            });
    

    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Booking Approval Page</h1>
            <ul className="space-y-4">
                {bookings.map(booking => (
                    <li key={booking._id} className="p-4 bg-gray-100 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Customer Name: {booking.customerName} - Pet Name:{booking.petName}</span>
                            <span className="ml-2">| Current Status: <span className="font-bold">{booking.approvalStatuse}</span></span>
                        </div>
                        <div className="mt-2 flex justify-end space-x-2">
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBookingApprovalPage;
