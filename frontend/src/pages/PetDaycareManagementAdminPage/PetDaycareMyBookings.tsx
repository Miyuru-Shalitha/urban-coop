import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
}

const PetDaycareMyBookings: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);
  const [itemName, setItemName] = useState<string>('');

  const handleAddItem = () => {
    if (itemName.trim() === '') return;
    const newItem: Item = {
      id: new Date().getTime(),
      name: itemName,
    };
    setItems([...items, newItem]);
    setItemName('');
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-32">
      <h2 className="text-2xl font-bold mb-4">My Pet Daycare Bookings</h2>
      <input
        type="text"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        className="border border-gray-300 p-2 rounded mr-2"
        placeholder="Enter item name"
      />
      <button
        onClick={handleAddItem}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
      <table className="mt-4 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-t border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetDaycareMyBookings;
