import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {User,getUsers } from "../../services/UserRegistration";

const Userdash = () => {
    const [User, setUser] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUser = await getUsers();
                setUser(allUser);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="w-3/4 ... mx-auto p-8 font-sans ">

            
            <div className="overflow-x-auto">
                <table className="table-auto border border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Mobile No</th>
                            <th className="px-4 py-2 text-left">Atendees</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {User && User.length > 0 ? (
                           User.map((User, index) => (
                                <tr key={index}>
                                   
                                    <td className="px-4 py-2">{User.name}</td>
                                    <td className="px-4 py-2">{User.email}</td>
                                    <td className="px-4 py-2">{User.mobile}</td>
                                    <td className="px-4 py-2">{User.atendees}</td>
                                    <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                        <button className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link
                                            to={""}
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
        </div>
    );
};

export default Userdash;