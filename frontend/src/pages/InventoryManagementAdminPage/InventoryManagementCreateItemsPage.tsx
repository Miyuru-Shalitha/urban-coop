
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Create Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemCode" className="block text-gray-700 font-medium mb-2">
              Item Code
            </label>
            <input
              type="text"
              id="itemCode"
              name="itemCode"
              value={itemData.itemCode}
              onChange={(e) => setItemData({ ...itemData, itemCode: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter Item Code"
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
              value={itemData.itemName}
              onChange={(e) => setItemData({ ...itemData, itemName: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter Item Name"
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
              value={itemData.itemBrand}
              onChange={(e) => setItemData({ ...itemData, itemBrand: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter Item Brand"
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
              value={itemData.category}
              onChange={(e) => setItemData({ ...itemData, category: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter Item Category"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
              Item Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={itemData.quantity}
              onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter Item Quantity"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primaryAccent px-4 py-2 text-black font-medium uppercase hover:bg-primary"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}
