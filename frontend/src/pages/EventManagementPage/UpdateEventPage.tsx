import { useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  image: File | string;
  maxParticipation: number;
  description: string;
}

const UpdateEvent = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [Event, SetEvent] = useState<Event>({
    title: '',
    date: '',
    time: '',
    location: '',
    image: '',
    maxParticipation: 0,
    description: '',
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    SetEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };
  
  const changeImageHandler = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      SetEvent(prevEvent => ({
        ...prevEvent,
        image: e.target.files[0],
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', Event.title);
      formData.append('date', Event.date);
      formData.append('time', Event.time);
      formData.append('location', Event.location);
      if (Event.image instanceof File) {
        formData.append('image', Event.image);
      }
      formData.append('maxAttendance', Event.maxParticipation.toString());
      formData.append('description', Event.description);
      
      const response = await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      console.log(response.data); // Log response from the backend
      
      toast.success('Event updated successfully!', { position: "top-right" });
      Navigate("/admin/event-dashboard");
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Something went wrong!');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        SetEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Something went wrong while fetching event!');
      }
    };
    fetchData();
  }, []);
 
  return (

    <div className="flex justify-center items-center h-screen w-full m-4 font-sans">
      <div className="bg-gray-200 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold p-4 text-center">Update Event</h1>
        <form onSubmit={handleSubmit} className="px-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={Event.title}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={Event.date}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={Event.time}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={Event.location}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <img
        src={`http://localhost:5000/${Event.image}`}
        alt="Registration Image"
        className="mt-4 w-64 h-auto"
      />
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Event Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={changeImageHandler}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxAttendance" className="block text-gray-700 font-bold mb-2">
              Max Attendance
            </label>
            <input
              type="number"
              name="maxAttendance"
              id="maxAttendance"
              value={Event.maxParticipation}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={Event.description}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primaryAccent hover:bg-primary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default UpdateEvent;