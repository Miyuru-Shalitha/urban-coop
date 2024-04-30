import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InventoryManagementUpdateItems = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({
    itemCode: '',
    itemName: '',
    itemBrand: '',
    itemCategory: '',
    itemQuantity: '',
  });

  const handleInputChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/items/create`, item);
      console.log(response.data);
      toast.success('Item updated successfully!', { position: "top-right" });
      Navigate('/inventory-management'); // Assuming the URL to navigate back to inventory management
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/items`);
      setItem(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full m-4 font-sans">
      <div className="bg-gray-200 w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold p-4 text-center">Update Item</h1>
        <form onSubmit={handleSubmit} className="px-4">
          <div className="mb-4">
            <label htmlFor="itemCode" className="block text-gray-700 font-bold mb-2">
              Item Code
            </label>
            <input
              type="text"
              name="itemCode"
              id="itemCode"
              value={item.itemCode}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-gray-700 font-bold mb-2">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              id="itemName"
              value={item.itemName}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="itemBrand" className="block text-gray-700 font-bold mb-2">
              Item Brand
            </label>
            <input
              type="text"
              name="itemBrand"
              id="itemBrand"
              value={item.itemBrand}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="itemCategory" className="block text-gray-700 font-bold mb-2">
              Item Category
            </label>
            <input
              type="text"
              name="itemCategory"
              id="itemCategory"
              value={item.itemCategory}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="itemQuantity" className="block text-gray-700 font-bold mb-2">
              Item Quantity
            </label>
            <input
              type="text"
              name="itemQuantity"
              id="itemQuantity"
              value={item.itemQuantity}
              onChange={handleInputChange}
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primaryAccent hover:bg-primary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryManagementUpdateItems;
