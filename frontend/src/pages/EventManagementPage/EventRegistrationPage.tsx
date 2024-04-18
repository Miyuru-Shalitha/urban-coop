import React from 'react';

const EventRegistrationForm = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Event Registration </h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
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
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
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