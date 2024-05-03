import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      if (response.status === 200) {
        alert('Event deleted successfully!');
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        alert('Failed to delete Event. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting Event:', error);
      alert('An error occurred while deleting Event. Please try again later.');
    }
  };

  const handleSearch = (e:any) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-3/4 mx-auto p-8 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div>
          <Link
            to="/admin/inventory-management/item-create"
            className="inline-block px-4 py-2 bg-primary text-back font-bold rounded hover:bg-primaryAccent mr-4"
          >
            Add Item
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by item name..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Item Code</th>
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2 text-left">Item Brand</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{item.itemCode}</td>
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">{item.itemBrand}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => deleteItem(item._id)} 
                    className="bg-secondary text-white py-2 px-4 rounded-md">
                      Delete
                    </button>
                    <Link to={`item-update/`+item._id}>

                      <button className="bg-primary text-white py-2 px-4 rounded-md ml-2">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
