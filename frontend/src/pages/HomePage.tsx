import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";

export default function HomePage() {
  // State to hold the approved feedbacks data
  const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);

  // Fetch approved feedbacks from the backend API
  useEffect(() => {
    const fetchApprovedFeedbacks = async () => {
      try {
        // Make a GET request to the API endpoint for approved feedbacks
        const response = await axios.get('http://localhost:5000/api/feedback/approved', {
          params: {
            limit: 3 // Limit the number of feedbacks to fetch
          }
        });

        // Update state with approved feedbacks data
        setApprovedFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching approved feedbacks:', error);
        // Optionally, you could add a toast message here to notify the user about the error
      }
    };

    // Call the function to fetch approved feedbacks
    fetchApprovedFeedbacks();
  }, []);

  return (
    <>
      <Header />

      <div className="grid grid-cols-3 gap-[70px] px-[80px] h-[200px] bg-secondary p-[50px]">
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Online Booking
          </h1>
          <p className="text-center text-white">
            Urban Coop online booking system allows users to quickly schedule a
            booking for their pets.
          </p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Customer Service
          </h1>
          <p className="text-center text-white">
            Experience exceptional service, tailored just for you.
          </p>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-white text-center my-2">
            Fast Pickup
          </h1>
          <p className="text-center text-white">
            Fast pickup, worry-free pet sitting - because your furry friends
            deserve the best.
          </p>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-secondary pl-[40px] pt-[50px] text-[40px]">
        Our Services
      </h1>

      {/* Approved Feedbacks Section */}
      <div className="px-4 mt-8">
        <h2 className="text-2xl font-bold text-secondary">Approved Feedbacks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {approvedFeedbacks.length > 0 ? (
            approvedFeedbacks.map((feedback) => (
              <div key={feedback._id} className="p-4 bg-white shadow rounded">
                <h3 className="text-lg font-semibold">{feedback.rating}</h3>
                <p className="text-sm text-gray-600">{feedback.comment}</p>
              </div>
            ))
          ) : (
            <p>No approved feedbacks available at the moment.</p>
          )}
        </div>
      </div>

      <div
        // TO ADD IMAGE TO THE BACKGROUND
        style={{ backgroundImage: `` }}
        className="snap-start bg-cover bg-center h-screen w-auto"
      ></div>
    </>
  );
}
