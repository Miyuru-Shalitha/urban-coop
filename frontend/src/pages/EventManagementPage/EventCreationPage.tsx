import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3).max(50),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  maxParticipation: z.number().min(1),
  description: z.string(),
});
interface FormState {
  title: string;
  date: string;
  time: string;
  location: string;
  image: any; 
  maxParticipation:number;
  description: string;
}
export default function EventCreationForm() {
  const Navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({
    title: '',
    date: '',
    time: '',
    location: '',
    image: '',
    maxParticipation: 0, 
    description: '',
  });

  // State to hold validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // If the input name is maxParticipation, parse the value as a number
    const newValue = name === 'maxParticipation' ? parseInt(value, 10) : value;
    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleImageChange = (e:any) => {
    setFormState({
      ...formState,
      image: e.target.files[0], // Assuming image will be a file object
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      // Validate form data against zod schema
      eventSchema.parse(formState);

      const formData = new FormData();
      formData.append('title', formState.title);
      formData.append('date', formState.date);
      formData.append('time', formState.time);
      formData.append('location', formState.location);
      formData.append('image', formState.image);
      formData.append('maxParticipation',formState.maxParticipation.toString());
      formData.append('description', formState.description);

      await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Event created successfully!');
      Navigate("/admin/event-dashboard");

    } catch (error) {
      // If validation fails, display error messages
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors.reduce((acc, err) => {
          return { ...acc, [err.path[0]]: err.message };
        }, {}));
      } else {
        console.error('Unknown error:', error);
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen w-full m-4 font-sans">
      <div className=" bg-gray-200 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="">
          <h1 className="text-3xl font-bold p-4">Create Event</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formState.title}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.title ? 'border-red-500' : ''}`}
            />
            {validationErrors.title && <p className="text-red-500 text-sm">{validationErrors.title}</p>}
          </div>
          {/* Date */}
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
                className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.date ? 'border-red-500' : ''}`}
              />
              {validationErrors.date && <p className="text-red-500 text-sm">{validationErrors.date}</p>}
            </div>
            {/* Time */}
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
                className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.time ? 'border-red-500' : ''}`}
              />
              {validationErrors.time && <p className="text-red-500 text-sm">{validationErrors.time}</p>}
            </div>
          </div>
          {/* Location */}
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
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.location ? 'border-red-500' : ''}`}
            />
            {validationErrors.location && <p className="text-red-500 text-sm">{validationErrors.location}</p>}
          </div>
          {/* Event Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Event Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.image ? 'border-red-500' : ''}`}
            />
            {validationErrors.image && <p className="text-red-500 text-sm">{validationErrors.image}</p>}
          </div>
          {/* Max Participation */}
          <div className="mb-4">
            <label htmlFor="maxParticipation" className="block text-gray-700 font-bold mb-2">
              Max Participation
            </label>
            <input
              type="number"
              name="maxParticipation"
              id="maxParticipation"
              value={formState.maxParticipation}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.maxParticipation ? 'border-red-500' : ''}`}
            />
            {validationErrors.maxParticipation && <p className="text-red-500 text-sm">{validationErrors.maxParticipation}</p>}
          </div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formState.description}
              onChange={handleInputChange}
              className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${validationErrors.description ? 'border-red-500' : ''}`}
            />
            {validationErrors.description && <p className="text-red-500 text-sm">{validationErrors.description}</p>}
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
