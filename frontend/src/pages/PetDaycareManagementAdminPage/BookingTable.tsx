import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BookingTable = () => {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings');
                const allBookings = response.data;

                setBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter((booking) => {
        // Check if the search query is present in any of the booking fields (you can customize this logic)
        return (
            booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.contactNumber.includes(searchQuery) ||
            booking.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.startDate.includes(searchQuery) ||
            booking.endDate.includes(searchQuery) ||
            booking.petType.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="w-3/4 mx-auto p-8 font-sans">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="Search by any field..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Customer Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Contact Number</th>
                            <th className="px-4 py-2 text-left">Pet Description</th>
                            <th className="px-4 py-2 text-left">Start Date</th>
                            <th className="px-4 py-2 text-left">End Date</th>
                            <th className="px-4 py-2 text-left">Pet Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-4 py-2">{booking.customerName}</td>
                                    <td className="px-4 py-2">{booking.email}</td>
                                    <td className="px-4 py-2">{booking.contactNumber}</td>
                                    <td className="px-4 py-2 w-32">{booking.description}</td>
                                    <td className="px-4 py-2 w-32">{booking.startDate}</td>
                                    <td className="px-4 py-2 w-48">{booking.endDate}</td>
                                    <td className="px-4 py-2 w-48">{booking.petType}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-4 py-2 text-center">No bookings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingTable;
