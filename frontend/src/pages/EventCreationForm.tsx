import { useState } from "react";

const EventCreationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [maxAttendance, setMaxAttendance] = useState('');
  

  const handleSubmit = () => {
    console.log({ title, description, date, time, location, image, maxAttendance });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 bg-orange-50">
      <div className=" bg-gray-200 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="text-center w-full">
          <h1 className="text-3xl font-bold p-4">Create Event</h1>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input type="file"
          name ='image'
          id= 'image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
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
            value={maxAttendance}
            onChange={(e) => setMaxAttendance(e.target.value)}
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Create Event
        </button>
      </div>
    </div>
  );
}

export default EventCreationForm;