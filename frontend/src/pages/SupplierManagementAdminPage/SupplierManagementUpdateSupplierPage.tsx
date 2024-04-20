import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Supplier {
    supplierId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    category: string;
}

export default function SupplierManagementUpdateSupplierPage() {
    const { supplierId } = useParams<{ supplierId: string }>();
    const [supplier, setSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        fetchSupplierDetails();
    }, [supplierId]);

    const fetchSupplierDetails = () => {
        axios.get(`http://localhost:5000/api/suppliers/${supplierId}`)
            .then((res) => {
                setSupplier(res.data);
            })
            .catch((err) => {
                console.error('Error fetching supplier details:', err);
            });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Send updated supplier details to the server
        axios.put(`http://localhost:5000/api/suppliers/${supplierId}`, supplier)
            .then((res) => {
                console.log('Supplier updated successfully:', res.data);
                // Optionally, you can redirect the user or show a success message
            })
            .catch((err) => {
                console.error('Error updating supplier:', err);
            });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Update Supplier Details</h2>
            {supplier ? (
                <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupID">
                                Supplier ID
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupID"
                                type="text"
                                value={supplier.supplierId}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupName">
                                Supplier Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupName"
                                type="text"
                                value={supplier.name}
                                onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupPhone">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupPhone"
                                type="text"
                                value={supplier.phoneNumber}
                                onChange={(e) => setSupplier({ ...supplier, phoneNumber: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupEmail">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupEmail"
                                type="text"
                                value={supplier.email}
                                onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupAddress">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupAddress"
                                type="text"
                                value={supplier.address}
                                onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SupCategory">
                                Category
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupCategory"
                                type="text"
                                value={supplier.category}
                                onChange={(e) => setSupplier({ ...supplier, category: e.target.value })}
                            />
                        </div>
                        <button
                            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update
                        </button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
