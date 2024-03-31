import { useState } from "react";
const EventPage = () => {
    const [events, setEvents] = useState([
        { id: 1, title: 'Event 1', description: 'Description of event 1', date: '2022-12-01', location: 'Location 1', image: 'event1.jpg' },
        { id: 2, title: 'Event 2', description: 'Description of event 2', date: '2022-12-15', location: 'Location 2', image: 'event2.jpg' },
        { id: 3, title: 'Event 1', description: 'Description of event 1', date: '2022-12-01', location: 'Location 1', image: 'event1.jpg' },
        { id: 4, title: 'Event 2', description: 'Description of event 2', date: '2022-12-15', location: 'Location 2', image: 'event2.jpg' },
    ]);

    return (
        
  <div className="max-w-6xl mx-auto p-10">

    <div className="flex justify-between items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-right mr-8">Event</h1>
      </div>

      <div className="relative flex-grow-0">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <input
          type="text"
          className="block w-64 pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search..."
          // onChange={handleChange}
          // value={searchInput}
        />
    </div>

    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in-left">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 transform transition-transform duration-500 ease-in-out delay-100 hover:-translate-y-2 hover:shadow-2xl"
          style={{ height: "300px" }}
        >
          <div className="flex" style={{ height: "100%" }}>
            <img
              className="w-1/3 h-auto object-cover object-center"
              src={event.image}
              alt={event.title}
            />
            <div className="p-4 flex flex-col justify-center w-2/3">
              <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-gray-600 mt-2">Date: {event.date}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded mt-4">
                Register
              </button>

            </div>
          </div>
        </div>
      ))}
      
    </div>
  </div>


    );
};

export default EventPage;

