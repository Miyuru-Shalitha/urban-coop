import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventDash = () => {
    const [events, setEvents] = useState([ {
        title: "Event 1",
        image: "image_url_1",
        date: "2024-04-12",
        time: "10:00 AM",
        location: "Location 1",
        maxParticipation: 100,
        description: "Description for Event 1",
    },
    {
        title: "Event 2",
        image: "image_url_2",
        date: "2024-04-13",
        time: "11:00 AM",
        location: "Location 2",
        maxParticipation: 150,
        description: "Description for Event 2",
    },]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("API_URL_HERE");
    //             setEvents(response.data);
    //         } catch (error) {
    //             console.error("Error fetching events:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="w-3/4 ... mx-auto p-8 font-sans ">
            <Link to={"addEvent"} className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Event
            </Link>
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
                                    <td className="px-4 py-2">{event.location}</td>
                                    <td className="px-4 py-2">{event.maxParticipation}</td>
                                    <td className="px-4 py-2">{event.description}</td>
                                    <td className="px-4 py-2">
                                        <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link
                                            to={"uptadeEvent"}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
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
