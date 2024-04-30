import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
    total: number;
    date: string;
    petType: string;
}

const AdminDashboardOverview: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [petTypes, setPetTypes] = useState<{ [key: string]: number }>({});

    // Function to calculate total bookings, revenue, and pets
    const calculateMetrics = () => {
        let totalBookings = 0;
        let totalRevenue = 0;
        const petTypes: { [key: string]: number } = {};

        bookings.forEach((booking) => {
            // Increment total bookings
            totalBookings += 1;

            // Increment total revenue
            totalRevenue += booking.total;

            // Calculate pet types
            const petType = booking.petType;
            if (petType) {
                if (!petTypes[petType]) {
                    petTypes[petType] = 0;
                }
                petTypes[petType] += 1;
            }
        });

        setTotalBookings(totalBookings);
        setTotalRevenue(totalRevenue);
        setPetTypes(petTypes);
    };

    // Fetch bookings data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Booking[]>('http://localhost:5000/api/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings data:', error);
            }
        };

        fetchData();
    }, []);

    // Calculate metrics whenever bookings data changes
    useEffect(() => {
        calculateMetrics();
    }, [bookings]);

    return (
        <div className="bg-gray-100 h-screen w-screen flex justify-start items-start p-8">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-16">
                <div className="flex items-center justify-center">
                    <div className=" w-full h-60 bg-secondary shadow-lg rounded-lg p-4">
                        <h6 className="text-4xl font-bold text-white">Total Bookings</h6>
                        <p className="text-7xl mt-4 text-white">{totalBookings}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full h-60 bg-white shadow-lg rounded-lg p-4">
                        <h6 className="text-4xl font-bold">Pet Daycare Revenue</h6>
                        <p className="text-7xl mt-4">Rs {totalRevenue.toFixed(2)}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full h-60 bg-white shadow-lg rounded-lg p-4">
                        <h6 className="text-4xl font-bold">Total Pets</h6>
                        {Object.entries(petTypes).map(([type, count]) => (
                            <p key={type} className="text-4xl mt-2">
                                {type}: {count}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminDashboardOverview;
