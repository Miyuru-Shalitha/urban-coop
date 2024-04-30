import {useState} from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EventCreationForm() {
  const Navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    image: '',
    maxParticipation: '',
    description: '',
  });
  
  const handleInputChange = (e :any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
   
  };
  const handleImageChange = (e:any) => {
    setFormState({
      ...formState,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

   
    
    const formData = new FormData();
    formData.append('title', formState.title);
    formData.append('date', formState.date);
    formData.append('time', formState.time);
    formData.append('location', formState.location);
    formData.append('image', formState.image);
    formData.append('maxParticipation', formState.maxParticipation);
    formData.append('description', formState.description);

    try {
      await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Event created successfully!');
      Navigate("/admin/event-dashboard")

    } catch (error) {  
      console.error('Error creating event:', error);
      toast.error('Something went wrong!');
    }
  };
  return (
    
    <div className=" flex flex-col items-center justify-center h-screen w-full m-4 font-sans">
      
      <div className=" bg-gray-200 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="">
          <h1 className="text-3xl font-bold p-4">Create Event</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formState.title}
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
                value={formState.date}
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
                value={formState.time}
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
              value={formState.location}
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
              onChange={handleImageChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxAttendance" className="block text-gray-700 font-bold mb-2">
              Max Attendance
            </label>
            <input
              type="number"
              name="maxParticipation"
              id="maxParticipation"
              value={formState.maxParticipation}
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
              value={formState.description}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primaryAccent hover:bg-primary text-back font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}