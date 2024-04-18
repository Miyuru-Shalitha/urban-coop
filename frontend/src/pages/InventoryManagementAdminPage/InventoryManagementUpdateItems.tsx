export default function InventoryManagementUpdateItems() {
    return  (
        <div>
          INVENTORY MANAGEMENT UPDATE ITEM
          <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-xl font-bold mb-4">Update Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCode">
                  Item Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="itemCode"
                  type="text"
                  placeholder="Item Code"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                  Item Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="itemName"
                  type="text"
                  placeholder="Item Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemBrand">
                  Item Brand
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="itemBrand"
                  type="text"
                  placeholder="Item Brand"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemCategory">
                  Item Category
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="itemCategory"
                  type="text"
                  placeholder="Item Category"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemQuantity">
                  Item Quantity
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="itemQuantity"
                  type="text"
                  placeholder="Item Quantity"
                />
              </div>
              <button
               className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit"
              >
                Update Item
              </button>
            </form>
          </div>
        </div>
      );
  }