import axios from 'axios';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UpdateItemForm = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [itemCode, setItemCode] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [itemBrand, setItemBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!itemCode || !itemName || !itemBrand || !category || quantity === '') {
      toast.error('Please fill in all fields.');
      return;
    }
  
    if (isNaN(quantity as number)) {
      toast.error('Quantity must be a number.');
      return;
    }
  

    try {
      const response = await axios.put(`http://localhost:5000/api/items/${id}`, {
        itemCode,
        itemName,
        itemBrand,
        category,
        quantity,
      });
      console.log("Server response:", response.data);
      toast.success('Item updated successfully!');
      Navigate('/admin/inventory-management/item');

    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'itemCode':
        setItemCode(value);
        break;
      case 'itemName':
        setItemName(value);
        break;
      case 'itemBrand':
        setItemBrand(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'quantity':
        setQuantity(value === '' ? '' : parseInt(value));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItemCode(item.data.itemCode);
        setItemName(item.data.itemName);
        setItemBrand(item.data.itemBrand);
        setCategory(item.data.category);
        setQuantity(item.data.quantity);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchData();
  }, [id]); // Add id to the dependency array

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Update Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemCode" className="block text-gray-700 font-medium mb-2">
              Item Code
            </label>
            <input
              type="text"
              id="itemCode"
              name="itemCode"
              value={itemCode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="itemName" className="block text-gray-700 font-medium mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="itemBrand" className="block text-gray-700 font-medium mb-2">
              Item Brand
            </label>
            <input
              type="text"
              id="itemBrand"
              name="itemBrand"
              value={itemBrand}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Item Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
              Item Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity === '' ? '' : String(quantity)}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primaryAccent px-4 py-2 text-black font-medium uppercase hover:bg-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemForm;
