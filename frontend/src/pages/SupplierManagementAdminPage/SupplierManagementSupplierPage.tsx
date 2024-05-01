import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';
import { useNavigate } from "react-router-dom";

interface Supplier {
    supplierId: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    category: string;
}

export default function AllSupplierDetails() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = () => {
        axios.get("http://localhost:5000/api/suppliers")
            .then((res) => {
                setSuppliers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleDelete = async (supplierId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/suppliers/${supplierId}`);
            console.log(response);
            if (response.status === 200) {
                toast.success('Supplier deleted successfully!');
                setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.supplierId !== supplierId));
            } else {
                toast.error('Failed to delete supplier. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting supplier:', error);
            toast.error('An error occurred while deleting supplier. Please try again later.');
        }
    };

    const handleEdit = (supplierId: string) => {
        // Redirect to the edit page with the supplierId
        navigate(`/admin/supplier-management/update-supplier/${supplierId}`);    
    };

    const supplierCount = suppliers.length;

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.supplierId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const PDFDocument = () => (
        <Document>
            <Page size="A4">
                <View>
                    {filteredSuppliers.map((supplier) => (
                        <View key={supplier.supplierId}>
                            <Text>Supplier ID: {supplier.supplierId}</Text>
                            <Text>Name: {supplier.name}</Text>
                            <Text>Phone Number: {supplier.phoneNumber}</Text>
                            <Text>Email: {supplier.email}</Text>
                            <Text>Address: {supplier.address}</Text>
                            <Text>Category: {supplier.category}</Text>
                            <Text>-------------------------------</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <h2 className="text-xl font-bold mb-4 text-gray-800">All Supplier Details</h2>
            <div className="mb-4">
                <PDFDownloadLink document={<PDFDocument />} fileName="supplier_details.pdf">
                    {({ loading }) => (
                        <button
                            className={`px-4 py-2 bg-secondary text-white rounded hover:bg-primaryAccent ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Loading document...' : 'Download PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>

            <div className="container mx-auto p-8 font-sans">
                <Link to={"/admin/supplier-management/create-suppliers"} className="inline-block mb-4 px-4 py-2 bg-primary text-white font-bold rounded hover:bg-primaryAccent">
                    Add Supplier
                </Link>
                <div className="flex items-center mb-4">
                    <label htmlFor="searchQuery" className="mr-2">Search By:</label>
                    <input
                        type="text"
                        id="searchQuery"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter supplier email or ID"
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <p className="text-lg font-bold mb-4">Supplier Count: {supplierCount}</p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Supplier ID</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Phone Number</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map((supplier) => (
                                <tr key={supplier.supplierId}>
                                    <td className="border px-4 py-2">{supplier.supplierId}</td>
                                    <td className="border px-4 py-2">{supplier.name}</td>
                                    <td className="border px-4 py-2">{supplier.phoneNumber}</td>
                                    <td className="border px-4 py-2">{supplier.email}</td>
                                    <td className="border px-4 py-2">{supplier.address}</td>
                                    <td className="border px-4 py-2">{supplier.category}</td>
                                    <td className="border px-4 py-2 flex">
                                        <button
                                            className="bg-primary text-white hover:bg-black py-1 px-3 rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 mr-2"
                                            onClick={() => handleEdit(supplier.supplierId)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-secondary text-white hover:bg-black py-1 px-3 rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
                                            onClick={() => handleDelete(supplier.supplierId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
