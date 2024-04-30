import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import toast from 'react-hot-toast';

const Userdash = () => {

    const [User, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUser = await axios.get("http://localhost:5000/api/reg");
                setUser(allUser.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
            finally {
            setLoading(false); // Set loading to false regardless of success or error
        }
        };
        fetchData();
    }, []);
    const deleteReg = async (userId:any) => {
        try {
          
          const response = await axios.delete(`http://localhost:5000/api/reg/${userId}`);
          if (response.status === 200) {
            toast.success('User deleted successfully!');
            setUser((prevUsers: any) => prevUsers.filter((user: any) => user._id !== userId));
          } else {
            toast.error('Failed to delete user. Please try again later.');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error('An error occurred while deleting user. Please try again later.');
        }
      };
    return (
        <div className="w-3/4 ... mx-auto p-8 font-sans ">
            {loading ? (
                <LoadingIndicator/>
            ) : (
            
            <div className="overflow-x-auto">
                <table className="table-auto border border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Event Name </th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Mobile No</th>
                            <th className="px-4 py-2 text-left">Atendees</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {User && User.length > 0 ? (
                           User.map((User) => (
                                <tr key={User._id}>
                                    <td className="px-4 py-2">{User.eventName}</td>
                                    <td className="px-4 py-2">{User.name}</td>
                                    <td className="px-4 py-2">{User.email}</td>
                                    <td className="px-4 py-2">{User.mobile}</td>
                                    <td className="px-4 py-2">{User.attendees}</td>
                                    <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                        <button onClick={() => deleteReg(User._id)} className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link
                                            to={"updateRegistration/" + User._id}
                                            className="bg-primaryAccent text-black px-3 py-1 rounded"
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-2 text-center">No events found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default Userdash;