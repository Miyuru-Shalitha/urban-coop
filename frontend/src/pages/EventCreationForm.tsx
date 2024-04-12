import { useState } from "react";
import axios from 'axios';

export default function EventCreationForm() {
  const [title, settitle] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [location, setlocation] = useState('');
  const [image, setimage] = useState('');
  const [maxAttendance, setmaxAttendance] = useState('');
  const [description, setdescription] = useState('');


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('location', location);
    formData.append('image', image);
    formData.append('maxAttendance', maxAttendance);
    formData.append('description', description);
    try {
      const response = await axios.post('http://localhost:5000/api/events', formData);
      console.log(response.data);
      alert(response.data.message);

    } catch (error: any) {
      alert('Something went wrong!');
    }
  };

  const oninputChange = (e:any) => {  
    console.log(e.target.files[0]);
    setimage(e.target.files[0]); 
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 bg-orange-50">
      <div className=" bg-gray-200 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="text-center w-full">
          <h1 className="text-3xl font-bold p-4">Create Event</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
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
                onChange={(e) => setdate(e.target.value)}
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
                onChange={(e) => settime(e.target.value)}
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
              onChange={(e) => setlocation(e.target.value)}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input type="file"
              name='image'
              id='image'
            
              onChange={oninputChange}
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
              onChange={(e) => setmaxAttendance(e.target.value)}
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
              onChange={(e) => setdescription(e.target.value)}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

          >
            Create Event
          </button>
        </form>
      </div>

    </div>
  );
}

