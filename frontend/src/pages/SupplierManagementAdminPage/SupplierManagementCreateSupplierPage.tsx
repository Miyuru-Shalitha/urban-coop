import axios from "axios";
import FilledButton from "../../components/Common/FilledButton";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SupplierManagementCreateSupplierPage() {

    const [supplierData, setSupplierData] = useState({
        supplierID: "",
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        category: "",
    })
    
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(supplierData);
        try {
            const response = await axios.post("http://localhost:5000/api/suppliers/create",{
                supplierID: supplierData.supplierID,
                name: supplierData.name,
                phoneNumber: supplierData.phoneNumber,
                email: supplierData.email,
                address: supplierData.address,
                category: supplierData.category,
            });

            if(response.status === 201) {
                navigate("/admin/supplier-management/Check");
            }

        } catch (error) {
            alert("Somthing went wrong!");
        }
    }

    return (
        <div>
            ADD SUPPLIER
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
                <h2 className="text-xl font-bold mb-4">Add Supplier</h2>
                <form
                    onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Supplier ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter Supplier ID"
                            value={supplierData.supplierID}
                            onChange={(e) => setSupplierData({ ...supplierData, supplierID: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Supplier Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter Name"
                            value={supplierData.name}
                            onChange={(e) => setSupplierData({ ...supplierData, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="tel"
                            placeholder="Enter Phone Number"
                            value={supplierData.phoneNumber}
                            onChange={(e) => setSupplierData({ ...supplierData, phoneNumber: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Enter Email"
                            value={supplierData.email}
                            onChange={(e) => setSupplierData({ ...supplierData, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter Address"
                            value={supplierData.address}
                            onChange={(e) => setSupplierData({ ...supplierData, address: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Category
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter Category"
                            value={supplierData.category}
                            onChange={(e) => setSupplierData({ ...supplierData, category: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <FilledButton
                            className="text-base bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit Details
                        </FilledButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
