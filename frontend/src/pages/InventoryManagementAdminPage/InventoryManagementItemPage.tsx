import { Link } from "react-router-dom";

export default function InventoryManagementItemPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">INVENTORY MANAGEMENT All ITEMS</h1>
      <table className="border border-black">
        <tr className="bg-primary text-black border-b border-black ">
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Item Brand</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
        <tr className="border-b border-black ">
          <td className="p-2">I001</td>
          <td className="p-2">Dry Dog Food</td>
          <td className="p-2">Pedigree</td>
          <td className="p-2">Dog Food</td>
          <td className="p-2">100 </td>
          <td className="p-2">
            <a href="/admin/inventory-management/item-update" className="text-primary mr-2">
              Edit
            </a>
            <button>Delete</button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="p-2">I002</td>
          <td className="p-2">Wet Cat Food</td>
          <td className="p-2">Fancy Feast</td>
          <td className="p-2">Cat Food</td>
          <td className="p-2">75 </td>
          <td className="p-2">
            <a href="/admin/inventory-management/item-update" className="text-primary mr-2">
              Edit
            </a>
            <button>Delete</button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="p-2">I003</td>
          <td className="p-2">Dog Collar</td>
          <td className="p-2">Kong</td>
          <td className="p-2">Dog Accessory</td>
          <td className="p-2">30 </td>
          <td className="p-2">
            <a href="/admin/inventory-management/item-update" className="text-primary mr-2">
              Edit
            </a>
            <button>Delete</button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="p-2">I004</td>
          <td className="p-2">Cat Toy</td>
          <td className="p-2">Jackson Galaxy</td>
          <td className="p-2">Cat Accessory</td>
          <td className="p-2">50 </td>
          <td className="p-2">
            <a href="/admin/inventory-management/item-update" className="text-primary mr-2">
              Edit
            </a>
            <button>Delete</button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="p-2">I005</td>
          <td className="p-2">Dog Chew Toy</td>
          <td className="p-2">Nylabone</td>
          <td className="p-2">Dog Accessory</td>
          <td className="p-2">100 </td>
          <td className="p-2">
            <a href="/admin/inventory-management/item-update" className="text-primary mr-2">
              Edit
            </a>
            <button>Delete</button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="p-2">I006</td>
          <td className="p-2">Catnip Toy</td>
          <td className="p-2">Yeowww!</td>
          <td className="p-2">Cat Accessory</td>
          <td className="p-2">40 </td>
          <td className="p-2">
            <a href="/admin/inventory-management/item-update" className="text-primary mr-2">
              Edit
            </a>
            <button>Delete</button>
          </td>
        </tr>
      </table>
      <br />
      <Link to="/admin/inventory-management/item-create">
        <button className="bg-primary text-white py-2 px-4 rounded-md">
          Create
        </button>
      </Link>
    </div>
  );
}
