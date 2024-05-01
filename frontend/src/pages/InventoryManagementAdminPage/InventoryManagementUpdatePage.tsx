import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateItems = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [Item, setItem] = useState({
    itemCode: '',
    itemName: '',
    itemBrand: '',
    category: '',
    quantity: '',
  });

  const handleInputChange = (e:any) => {
    setItem({
      ...Item,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('code', Item.itemCode);
    formData.append('name', Item.itemName);
    formData.append('brand', Item.itemBrand);
    formData.append('category', Item.category);
    formData.append('quantity', Item.quantity);
    try {
      const response = await axios.put(`http://localhost:5000/api/items/`,formData);
      console.log(response.data);
      toast.success('Item updated successfully!', { position: "top-right" });
      Navigate('/inventory-management'); // Assuming the URL to navigate back to inventory management
    } catch (error) {
     
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/items/${id}`);
      setItem(response.data);
    };
    fetchData();
  }, []);


  // export default function InventoryManagementUpdateItems() {
    return (
      <div>
        INVENTORY MANAGEMENT UPDATE ITEM
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6 ">
          <h2 className="text-xl font-bold mb-4">Update Item</h2>
          <form onSubmit={handleSubmit} className="px-4">
  
            <div className="mb-4">
              <label htmlFor="itemCode" className="block text-gray-700 font-bold mb-2">
                Item Code
              </label>
              <input
                type="text"
                name="itemCode"
                id="itemCode"
                value={Item.itemCode}
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
                value={Item.itemName}
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
                value={Item.itemBrand}
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
                value={Item.category}
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
                value={Item.quantity}
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
  // };
}

export default UpdateItems;




