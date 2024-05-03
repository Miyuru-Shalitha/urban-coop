import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stocks');
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };
        fetchStocks();
    }, []);

    const filteredStocks = stocks.filter((stock) => {
        return (
            stock.stockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.stockBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.quantity.toString().includes(searchQuery) ||
            stock.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
      
        <div className="w-full mx-auto p-8 font-sans">
          
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link to="/admin/inventory-management/request-create" className="bg-primaryAccent text-black px-4 py-2 rounded">
                    Add Stock
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Stock Code</th>
                            <th className="px-4 py-2 text-left">Stock Brand</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStocks.length > 0 ? (
                            filteredStocks.map((stock) => (
                                <tr key={stock._id}>
                                  <td className="px-4 py-2">{stock.date}</td>
                                    <td className="px-4 py-2">{stock.stockCode}</td>
                                    <td className="px-4 py-2">{stock.stockBrand}</td>
                                    <td className="px-4 py-2">{stock.quantity}</td>
                                    <td className="px-4 py-2">{stock.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-2 text-center">No stocks found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockTable;
