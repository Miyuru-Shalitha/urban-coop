import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import toast from "react-hot-toast";

interface Event {
  _id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  maxParticipation: string;
  description: string;
}

const EventDash: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventIdToDelete, setEventIdToDelete] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      if (response.status === 200) {
        toast.success("Event deleted successfully!");
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      } else {
        toast.error("Failed to delete Event. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting Event:", error);
      toast.error("An error occurred while deleting Event. Please try again later.");
    }
  };

  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const openViewModal = (eventId: string) => {
    const selectedEvent = events.find(event => event._id === eventId);
    setSelectedEvent(selectedEvent || null);
    setIsModalOpen(true);
    setEventIdToDelete(""); // Reset eventIdToDelete
  };
  
  // Function to open modal for deleting an event
  const openDeleteModal = (eventId: string) => {
    const selectedEvent = events.find(event => event._id === eventId);
    setSelectedEvent(selectedEvent || null);
    setIsModalOpen(true);
    setEventIdToDelete(eventId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventIdToDelete("");
  };

  const confirmDelete = async () => {
    if (eventIdToDelete) {
      await deleteEvent(eventIdToDelete);
      setEventIdToDelete("");
      closeModal();
    }
  };

  return (
    <div className="w-3/4 mx-auto p-8 font-sans ">
      <h1 className="text-2xl font-bold mb-4 text-center">Event Data</h1>
      <Link
        to={"addEvent"}
        className="inline-block mb-4 px-4 py-2 bg-primaryAccent text-back font-bold rounded hover:bg-primary"
      >
        Add Event
      </Link>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search Event..."
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />

      <p className="text-lg font-bold mb-4">Event Count: {events.length}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Max Participation</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">{formatDate(event.date)}</td>
                <td className="px-4 py-2">{event.time}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{event.maxParticipation}</td>
                <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                  <button onClick={() => openViewModal(event._id)} className="bg-primaryAccent text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0 hover:bg-primary">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button onClick={() => openDeleteModal(event._id)} className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                    <i className="fas fa-trash"></i>
                  </button>
                  <Link
                      to={"uptadeEvent/" + event._id}
                      className="bg-primaryAccent text-black px-3 py-1 rounded"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
      <Modal
        isOpen={isModalOpen && !eventIdToDelete}
        onRequestClose={closeModal}
        contentLabel="Event Details Modal"
        className="bg-white rounded-md max-w-md mx-auto p-6"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        {selectedEvent && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedEvent.title}</h2>
            <p className="text-gray-600 mb-4"><img
              className="w-full h-full object-cover object-center"
              src={`http://localhost:5000/${selectedEvent.image}`}
              alt="ERROR"
            /></p>
            <p className="text-gray-600 mb-4">Date: {formatDate(selectedEvent.date)}</p>
            <p className="text-gray-600 mb-4">Time: {selectedEvent.time}</p>
            <p className="text-gray-600 mb-4">Location: {selectedEvent.location}</p>
            <p className="text-gray-600 mb-4">Max Participation: {selectedEvent.maxParticipation}</p>
            <p className="text-gray-600 mb-4">Description: {selectedEvent.description}</p>
          </div>
        )}
        <div className="flex justify-center">
          <button onClick={closeModal} className="bg-primaryAccent text-gray-700 px-4 py-2 rounded hover:bg-primary">
            Close
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen && !!eventIdToDelete}
        onRequestClose={() => {
          setEventIdToDelete("");
          setIsModalOpen(false);
        }}
        contentLabel="Delete Confirmation Modal"
        className="bg-white rounded-md max-w-md mx-auto p-6"
        overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to delete this event?</p>
        <div className="flex justify-center">
          <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">
            Yes
          </button>
          <button onClick={() => {
            setEventIdToDelete("");
            setIsModalOpen(false);
          }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EventDash;
