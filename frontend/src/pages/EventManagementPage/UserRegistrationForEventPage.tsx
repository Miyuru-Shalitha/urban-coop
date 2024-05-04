import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import toast from 'react-hot-toast';
import Modal from "react-modal";

const Userdash = () => {
    const [User, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUser = await axios.get("http://localhost:5000/api/reg");
                setUser(allUser.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };
        fetchData();
    }, []);

    const deleteReg = async (userId: string) => {
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

    const openModal = (userId: string) => {
        setIsModalOpen(true);
        setUserIdToDelete(userId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (userIdToDelete) {
            await deleteReg(userIdToDelete);
            setUserIdToDelete(""); // Reset userIdToDelete
            closeModal();
        }
    };

    // Function to filter user list based on search query
    const filteredUsers = User.filter(user =>
        user.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.attendees.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-3/4 ... mx-auto p-8 font-sans ">
            <h1 className="text-2xl font-bold mb-4 text-center">Event Registration Data</h1>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primaryAccent w-full max-w-md"
                />
            </div>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto border border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Event Name </th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Mobile No</th>
                                <th className="px-4 py-2 text-left">Attendees</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers && filteredUsers.length > 0 ? (
                                filteredUsers.map((user: any) => (
                                    <tr key={user._id}>
                                        <td className="px-4 py-2">{user.eventName}</td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.mobile}</td>
                                        <td className="px-4 py-2">{user.attendees}</td>
                                        <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                            <button onClick={() => openModal(user._id)} className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                            <Link
                                                to={"updateRegistration/" + user._id}
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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Delete Modal"
                className="bg-white rounded-md max-w-md mx-auto p-6"
                overlayClassName="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-center">
                    <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">
                        Yes
                    </button>
                    <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                        No
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Userdash;
