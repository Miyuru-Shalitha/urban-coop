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
                                id="itemCode"
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
                                id="itemName"
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
                                id="itemBrand"
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
                                id="itemCategory"
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
                                id="itemQuantity"
                                type="text"
                                placeholder="Enter Address"
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
            </div>
    );
}