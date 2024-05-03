import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        const allEvents = response.data;
        setEvents(allEvents);
      } catch (error) { 
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchInputChange = (e:any) => {
    setSearchQuery(e.target.value);  
  };

  const filteredEvents = events.filter((event:any) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-screen mx-auto bg-orange-50 pt-10 pl-20 pr-20 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Event</h1>
        </div>
        <div className="relative flex-grow-0 p-4">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-64 pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search Event..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in-left">
        {filteredEvents.map((event:any) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 transform transition-transform duration-500 ease-in-out delay-100 hover:-translate-y-2 hover:shadow-2xl"
            style={{ height: "300px" }}
          >
            <div className="flex" style={{ height: "100%" }}>
              <img
                className="w-2/3 h-auto object-cover object-center"
                src={`http://localhost:5000/${event.image}`}
                alt={event.title}
              />
              <div className=" p-4 w-2/3  max-h-full ...w-ful">
                <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mt-2">Date: {event.date}</p>
                <p className="text-gray-600 mt-2">Time: {event.time}</p>
                <p className="text-gray-600 mt-2">
                  Location: {event.location}
                </p>
                <p className="text-gray-700 mt-2 text-xs pb-4">
                  {event.description}
                </p>
                <Link to={`register/${event._id}`} className="inline-block px-2 py-1 bg-primaryAccent text-black rounded hover:bg-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
