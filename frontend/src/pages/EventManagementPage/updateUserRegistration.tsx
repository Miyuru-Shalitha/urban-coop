import axios from 'axios';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UpdateRegistrationForm = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [attendees, setAttendees] = useState<number | ''>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/reg/${id}`, {
        name,
        email,
        mobile,
        attendees,
      });
      console.log("Server response:", response.data);
      toast.success('Registration updated successfully!');
      Navigate('/admin/user-registerdashboard');

    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUser = await axios.get(`http://localhost:5000/api/reg/${id}`);
        setName(allUser.data.name);
        setEmail(allUser.data.email);
        setMobile(allUser.data.mobile);
        setAttendees(allUser.data.attendees);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, [id]); 
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Update Registration</h1>
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

            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primaryAccent px-4 py-2 text-black font-medium uppercase hover:bg-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRegistrationForm;
