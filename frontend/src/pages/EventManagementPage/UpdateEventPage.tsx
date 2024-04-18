import { useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UpdateEvent = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [Event, SetEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    image: '',
    maxAttendance: '',
    description: '',
  });
  const handleInputChange = (e: any) => {
    SetEvent({
      ...Event,
      [e.target.name]: e.target.value,
    });
  }
  const changeImageHandler = (e: any) => {
    SetEvent({
      ...Event,
      image: e.target.files[0],
    });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', Event.title);
    formData.append('date', Event.date);
    formData.append('time', Event.time);
    formData.append('location', Event.location);
    formData.append('image', Event.image);
    formData.append('maxAttendance', Event.maxAttendance);
    formData.append('description', Event.description);
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      console.log(response.data);
      toast.success('Event updated successfully!', { position: "top-right" });
      Navigate('/event-dashboard');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Something went wrong!');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      SetEvent(response.data);
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
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
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