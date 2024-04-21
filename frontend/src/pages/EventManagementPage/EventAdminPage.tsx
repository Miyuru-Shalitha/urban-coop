import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const EventDash = () => {
    const [events, setEvents] = useState([]);
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
      }, [])
      const deleteEvent = async (EventId:any) => {
        try {
          
          const response = await axios.delete(`http://localhost:5000/api/events/${EventId}`);
          if (response.status === 200) {
            toast.success('Event deleted successfully!');
            setEvents((prevUsers: any) => prevUsers.filter((user: any) => user._id !== EventId));
          } else {
            toast.error('Failed to delete Event. Please try again later.');
          }
        } catch (error) {
          console.error('Error deleting Event:', error);
          toast.error('An error occurred while deleting Event. Please try again later.');
        }
      };
    const eventCount = events.length
    return (
        <div className="w-3/4 ... mx-auto p-8 font-sans ">
            <Link to={"addEvent"} className="inline-block mb-4 px-4 py-2 bg-primaryAccent text-back font-bold rounded hover:bg-primary">
                Add Event
            </Link>

            <p className="text-lg font-bold mb-4">Event Count: {eventCount}</p>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Time</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Max Participation</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events && events.length > 0 ? (
                            events.map((event) => (
                                <tr key={event._id}>
                                    <td className="px-4 py-2">{event.title}</td>
                                    <td className="px-4 py-2"><img src={`http://localhost:5000/${event.image}`} alt="ERROR" /></td>
                                    <td className="px-4 py-2">{event.date}</td>
                                    <td className="px-4 py-2">{event.time}</td>
                                    <td className="px-4 py-2 w-32">{event.location}</td>
                                    <td className="px-4 py-2 w-32">{event.maxParticipation}</td>
                                    <td className="px-4 py-2 w-48">{event.description}</td>
                                    <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                        <button  onClick={() => deleteEvent(event._id)} className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link
                                            to={"uptadeEvent/"+event._id}
                                            className="bg-primaryAccent text-black px-3 py-1 rounded"
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-2 text-center">No events found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventDash;
