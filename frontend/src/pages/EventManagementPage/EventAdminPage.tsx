import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Event, getEvents } from "../../services/eventService";
const EventDash = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allEvents = await getEvents();
                setEvents(allEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchData();
    }, []);
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
                            events.map((event, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{event.title}</td>
                                    <td className="px-4 py-2">{event.image}</td>
                                    <td className="px-4 py-2">{event.date}</td>
                                    <td className="px-4 py-2">{event.time}</td>
                                    <td className="px-4 py-2 w-32">{event.location}</td>
                                    <td className="px-4 py-2 w-32">{event.maxParticipation}</td>
                                    <td className="px-4 py-2 w-48">{event.description}</td>
                                    <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                        <button className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link
                                            to={"uptadeEvent"}
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
