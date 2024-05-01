import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

interface Supplier {
    _id: string;
    supplierId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    category: string;
}

const SupplierDashboard = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/suppliers');
                const allSuppliers = response.data;

                setSuppliers(allSuppliers);
            } catch (error) {
                console.error("Error fetching Suppliers:", error);
            }
        };

        fetchSuppliers();
    }, [])
    const deleteSuppliers = async (supplierId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/suppliers/${supplierId}`);
            if (response.status === 200) {
                toast.success('Supplier deleted successfully!');
                setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier._id !== supplierId));
            } else {
                toast.error('Failed to delete Supplier. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting Supplier:', error);
            toast.error('An error occurred while deleting Supplier. Please try again later.');
        }
    };


    return (
        <div className="w-3/4 ... mx-auto p-8 font-sans ">
            <Link to={"addEvent"} className="inline-block mb-4 px-4 py-2 bg-primaryAccent text-back font-bold rounded hover:bg-primary">
                Add Event
            </Link>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Supplier Id</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Phone Number</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">category</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers && suppliers.length > 0 ? (
                            suppliers.map((suppliers) => (
                                <tr key={suppliers._id}>
                                    <td className="px-4 py-2">{suppliers.supplierId}</td>
                                    <td className="px-4 py-2">{suppliers.name}</td>
                                    <td className="px-4 py-2">{suppliers.phoneNumber}</td>
                                    <td className="px-4 py-2 w-32">{suppliers.email}</td>
                                    <td className="px-4 py-2 w-32">{suppliers.address}</td>
                                    <td className="px-4 py-2 w-48">{suppliers.category}</td>
                                    <td className="px-4 py-2 flex flex-col sm:flex-row sm:items-center">
                                        <button onClick={() => deleteSuppliers(suppliers._id)} className="bg-red-500 text-black px-3 py-1 rounded mr-2 mb-2 sm:mb-0">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <Link
                                            to={"uptadeEvent/" + suppliers._id}
                                            className="bg-primaryAccent text-black px-3 py-1 rounded"
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-2 text-center">No Suppliers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierDashboard;
