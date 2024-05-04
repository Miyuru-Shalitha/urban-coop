import axios from 'axios';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import Cookies from 'js-cookie';
const EventRegistrationForm = () => {
  const { id: eventId } = useParams();
  const Navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [attendees, setAttendees] = useState<number | ''>('');

  // Define Zod schema for validation
  const registrationSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    mobile: z.string().min(1),
    attendees: z.number().min(1).max(5).nullable(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    if (!userId) {
      toast.error('Please login to register for the event.');
      return;
    }
    try {
      // Validate input against Zod schema
      registrationSchema.parse({ name, email, mobile, attendees });
    } catch (validationError: any) {
      // Handle validation errors
      if (validationError instanceof z.ZodError) {
        // Iterate over validation errors and create custom error messages
        const validationMessages = validationError.errors.map((error) => {
          if (error.path[0] === 'name') {
            return 'Please enter your name.';
          } else if (error.path[0] === 'email') {
            return 'Please enter a valid email address.';
          } else if (error.path[0] === 'mobile') {
            return 'Please enter your contact number.';
          } else if (error.path[0] === 'attendees') {
            return 'Please enter a valid number of attendees (maximum 5).';
          } else {
            return 'Invalid input.';
          }
        });
  
        // Display the first validation message
        toast.error(validationMessages[0]);
        return;
      }
    }
  
    try {
      // Attempt to submit the registration
      const response = await axios.post('http://localhost:5000/api/reg', {
        userId,
        eventId,
        name,
        email,
        mobile,
        attendees,
      });
  
      // Handle successful registration
      if (response.status === 201) {
        toast.success('Registration successful!');
        Navigate('/events');
      }
    } catch (error: any) {
      // Handle server errors
      console.log(error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobile':
        setMobile(value); // No need to parse as integer since it's a string
        break;
      case 'attendees':
        setAttendees(value === '' ? '' : parseInt(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">User Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label htmlFor="attendees" className="block text-gray-700 font-medium mb-2">
              Attendee Count
            </label>
            <input
              type="number"
              id="attendees"
              name="attendees"
              value={attendees === '' ? '' : String(attendees)}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter the number of attendees"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primaryAccent px-4 py-2 text-black font-medium uppercase hover:bg-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
