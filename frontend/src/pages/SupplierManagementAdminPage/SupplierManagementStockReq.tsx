import { Link } from "react-router-dom";

export default function SupplierManagementStockReq() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                Stock request from Inventory Manager
            </h1>
            <table className="border border-black">
                <thead>
                    <tr className="bg-primary text-black border-b border-black ">
                        <th className="p-2">Date</th>
                        <th className="p-2">Item Code</th>
                        <th className="p-2">Item Name</th>
                        <th className="p-2">Item Brand</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-black" >
                        <td className="p-2">2024-04-16</td>
                        <td className="p-2">I002</td>
                        <td className="p-2">Wet Cat Food</td>
                        <td className="p-2">Fancy Feast</td>
                        <td className="p-2">10</td>
                        <td className="p-2">Pending</td>
                        <td className="p-2">
                            <button className="bg-primary hover:bg-green1 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                Accept<span className="ml-2">&#x2714;</span>
                            </button>
                        </td>
                    </tr>
                    <tr className="border-b border-black" >
                        <td className="p-2">2024-04-15</td>
                        <td className="p-2">I003</td>
                        <td className="p-2">Dry Dog Food</td>
                        <td className="p-2">Pedigree</td>
                        <td className="p-2">15</td>
                        <td className="p-2">Delivered</td>
                        <td className="p-2">
                            <button className="bg-primary hover:bg-green1 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                Accept<span className="ml-2">&#x2714;</span>
                            </button>
                        </td>
                    </tr>
                    <tr className="border-b border-black" >
                        <td className="p-2">2024-04-14</td>
                        <td className="p-2">I004</td>
                        <td className="p-2">Dog Chew Toy</td>
                        <td className="p-2">Nylabone</td>
                        <td className="p-2">20</td>
                        <td className="p-2">Pending</td>
                        <td className="p-2">
                            <button className="bg-primary hover:bg-green1 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                Accept<span className="ml-2">&#x2714;</span>
                            </button>
                        </td>
                    </tr>
                    <tr className="border-b border-black" >
                        <td className="p-2">2024-04-13</td>
                        <td className="p-2">I005</td>
                        <td className="p-2">Catnip Toy</td>
                        <td className="p-2">Yeowww!</td>
                        <td className="p-2">8</td>
                        <td className="p-2">Delivered</td>
                        <td className="p-2">
                            <button className="bg-primary hover:bg-green1 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                Accept<span className="ml-2">&#x2714;</span>
                            </button>
                        </td>
                    </tr>
                    <tr className="border-b border-black" >
                        <td className="p-2">2024-04-12</td>
                        <td className="p-2">I006</td>
                        <td className="p-2">Dog Collar</td>
                        <td className="p-2">Kong</td>
                        <td className="p-2">12</td>
                        <td className="p-2">Delivered</td>
                        <td className="p-2">
                            <button className="bg-primary hover:bg-green1 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                Accept<span className="ml-2">&#x2714;</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to="/" className="block mt-4">
                <button className="bg-primary text-white py-2 px-4 rounded-md">
                    Download Report
                </button>
            </Link>
        </div>
    );
}