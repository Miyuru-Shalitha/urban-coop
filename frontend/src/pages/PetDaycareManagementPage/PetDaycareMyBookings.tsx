import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";


const PetDaycareMyBookings = () => {

    const [bookings, setBooking] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/bookings');
            const allBookings = response.data;
    
            setBooking(allBookings);
          } catch (error) { 
            console.error("Error fetching bookings:", error);
          }
        };
    
        fetchBookings();
      }, [])
      const deleteBookings = async (BookingsId:any) => {
        try {
          
          const response = await axios.delete(`http://localhost:5000/api/bookings/${BookingsId}`);
          if (response.status === 200) {
            toast.success('Bookings deleted successfully!');
            setBooking((prevUsers: any) => prevUsers.filter((user: any) => user._id !== BookingsId));
          } else {
            toast.error('Failed to delete Event. Please try again later.');
          }
        } catch (error) {
          console.error('Error deleting Booking:', error);
          toast.error('An error occurred while deleting Booking. Please try again later.');
        }
      };


  return (
    <div className="w-3/4 ... mx-auto p-8 font-sans ">
   
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
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings && bookings.length > 0 ? (
                    bookings.map((bookings) => (
                        <tr key={bookings._id}>
                            <td className="px-4 py-2">{bookings.customerName}</td>
                            <td className="px-1 py-0">{bookings.email}</td>
                            <td className="px-4 py-2">{bookings.contactNumber}</td>
                            <td className="px-4 py-2 w-32">{bookings.description}</td>
                            <td className="px-4 py-2 w-32">{bookings.startDate}</td>
                            <td className="px-4 py-2 w-48">{bookings.endDate}</td>
                            <td className="px-4 py-2 w-48">{bookings.petType}</td>

                            <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                <button  onClick={() => deleteBookings(bookings._id)} className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                    <i className="fas fa-trash"></i>
                                </button>
                                <Link
                                    to={"update/"+bookings._id}
                                    className="bg-primaryAccent text-black px-3 py-1 rounded"
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8} className="px-4 py-2 text-center">No bookings found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default PetDaycareMyBookings
