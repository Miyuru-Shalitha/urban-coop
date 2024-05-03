import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    image: '',
    maxParticipation: 0,
    description: '',
  });
  const [errors, setErrors] = useState({}); // State for holding validation errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
        console.log('Event:', response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Failed to fetch event!');
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors:any = {};

    if (!event.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!event.date) {
      errors.date = "Date is required";
      isValid = false;
    }

    if (!event.time) {
      errors.time = "Time is required";
      isValid = false;
    }

    if (!event.location.trim()) {
      errors.location = "Location is required";
      isValid = false;
    }

    if (!event.image) {
      errors.image = "Image is required";
      isValid = false;
    }

    if (event.maxParticipation <= 0) {
      errors.maxParticipation = "Max Participation must be greater than 0";
      isValid = false;
    }

    if (!event.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const changeImageHandler = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setEvent(prevEvent => ({
        ...prevEvent,
        image: e.target.files[0],
      }));
    }
  };

  function formatDate(isoDateString:any) {
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0]; // Extract the date part in the format YYYY-MM-DD
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('date', event.date);
    formData.append('time', event.time);
    formData.append('location', event.location);
    formData.append('image', event.image);
    formData.append('maxParticipation', event.maxParticipation.toString());
    formData.append('description', event.description);

    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, formData);
      toast.success('Event updated successfully!', { position: "top-right" });
      navigate("/admin/event-dashboard");
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full m-4 font-sans">
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
              value={event.title}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.title && 'border-red-500'}`}
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={event.date && formatDate(event.date)}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.date && 'border-red-500'}`}
            />
            {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={event.time}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.time && 'border-red-500'}`}
            />
            {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={event.location}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.location && 'border-red-500'}`}
            />
            {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
          </div>
          <img src={`http://localhost:5000/${event.image}`} alt="event" className="w-full h-40 object-cover mb-4" />
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={changeImageHandler}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.image && 'border-red-500'}`}
            />
            {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="maxParticipation" className="block text-gray-700 font-bold mb-1">
              Max Participation
            </label>
            <input
              type="number"
              name="maxParticipation"
              id="maxParticipation"
              value={event.maxParticipation}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.maxParticipation && 'border-red-500'}`}
            />
            {errors.maxParticipation && <p className="text-red-500 text-xs italic">{errors.maxParticipation}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={event.description}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${errors.description && 'border-red-500'}`}
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
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
