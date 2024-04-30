
import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InventoryManagementCreateItemsPage() {
  const [itemData, setItemData] = useState({
    itemCode: "",
    itemName: "",
    itemBrand: "",
    category: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(itemData);
    try {
      const response =await axios.post("http://localhost:5000/api/items", {
        itemCode: itemData.itemCode,
        itemName: itemData.itemName,
        itemBrand: itemData.itemBrand,
        category: itemData.category,
        quantity: itemData.quantity,
      });
      console.log()
      if(response.status === 201) {
        navigate("/admin/inventory-management/item");
    }

    } catch (error: any) {
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      INVENTORY MANAGEMENT CREATE ITEM
      
    
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-xl font-bold mb-4">Create Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemCode"
            >
              Item Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=" Enter Item Code"
              value={itemData.itemCode}
              onChange={(e) =>
                setItemData({ ...itemData, itemCode: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemCode"
            >
              Item Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=" Enter Item Name"
              value={itemData.itemName}
              onChange={(e) =>
                setItemData({ ...itemData, itemName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemCode"
            >
              Item Brand
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=" Enter Item Brand"
              value={itemData.itemBrand}
              onChange={(e) =>
                setItemData({ ...itemData, itemBrand: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemCode"
            >
              Item Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=" Enter Item Category"
              value={itemData.category}
              onChange={(e) =>
                setItemData({ ...itemData, category: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemCode"
            >
              Item Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=" Enter Item Quantity"
              value={itemData.quantity}
              onChange={(e) =>
                setItemData({ ...itemData, quantity: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {}}
              type="submit"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
