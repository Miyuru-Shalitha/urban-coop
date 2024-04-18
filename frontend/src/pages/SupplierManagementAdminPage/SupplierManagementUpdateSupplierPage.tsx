import { Link } from "react-router-dom";
export default function SupplierManagementUpdateSupplierPage() {
    return (
        <div>
            UPDATE SUPPLIER DETAILS
                <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
                    <h2 className="text-xl font-bold mb-4">Update Supplier Details</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCode">
                                Supplier ID
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupID"
                                type="text"
                                placeholder="Enter Supplier ID"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                                Supplier Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupName"
                                type="text"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemBrand">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupPhone"
                                type="text"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCategory">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupEmail"
                                type="text"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemQuantity">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupAddress"
                                type="text"
                                placeholder="Enter Address"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemQuantity">
                                Category
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="SupCategory"
                                type="text"
                                placeholder="Enter Category"
                            />
                        </div>
                        <button
                            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update
                        </button>
                        <Link to="/admin/supplier-management/manage-suppliers">
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Cancel
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
    );
}