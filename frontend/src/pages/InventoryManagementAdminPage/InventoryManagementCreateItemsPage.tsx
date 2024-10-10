import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import toast from "react-hot-toast";

// Define the types
type TItemFormData = {
  itemCode: string;
  itemName: string;
  itemBrand: string;
  category: string;
  quantity: string;
};

function InventoryManagementCreateItemsPage() {
  const [itemData, setItemData] = useState<TItemFormData>({
    itemCode: "",
    itemName: "",
    itemBrand: "",
    category: "",
    quantity: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    try {
      // Send POST request to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/items",
        itemData
      );
      if (response.status === 201) {
        navigate("/admin/inventory-management/item");
        toast.success("Item added successfully!");
      }
    } catch (error: any) {
      console.error("Error creating item:", error);
      toast.error("Something went wrong!");
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    let valid = true;
    let errors: { [key: string]: string } = {};

    // Validate item code
    if (!itemData.itemCode) {
      valid = false;
      errors.itemCode = "Item code is required.";
    }

    // Validate item name
    if (!itemData.itemName) {
      valid = false;
      errors.itemName = "Item name is required.";
    }

    // Validate item brand
    if (!itemData.itemBrand) {
      valid = false;
      errors.itemBrand = "Item brand is required.";
    }

    // Validate category
    if (!itemData.category) {
      valid = false;
      errors.category = "Category is required.";
    }

    // Validate quantity
    if (!itemData.quantity) {
      valid = false;
      errors.quantity = "Quantity is required.";
    }

    setErrors(errors);
    return valid;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prevItemData) => ({
      ...prevItemData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
      <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
        <h1 className="text-2xl font-bold mb-4">Create Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            id="itemCode"
            label="Item Code"
            name="itemCode"
            className="w-full"
            variant="outlined"
            value={itemData.itemCode}
            onChange={handleInputChange}
            error={!!errors.itemCode}
            helperText={errors.itemCode}
          />
          <TextField
            id="itemName"
            label="Item Name"
            name="itemName"
            className="w-full"
            variant="outlined"
            value={itemData.itemName}
            onChange={handleInputChange}
            error={!!errors.itemName}
            helperText={errors.itemName}
          />
          <TextField
            id="itemBrand"
            label="Item Brand"
            name="itemBrand"
            className="w-full"
            variant="outlined"
            value={itemData.itemBrand}
            onChange={handleInputChange}
            error={!!errors.itemBrand}
            helperText={errors.itemBrand}
          />
          <Select
            id="category"
            name="category"
            label="Category"
            value={itemData.category}
            onChange={handleInputChange}
            error={!!errors.category}
            className="w-full"
            variant="outlined"
          >
            <MenuItem value="Pet Food">Pet Food</MenuItem>
            <MenuItem value="Medicine">Medicine</MenuItem>
            <MenuItem value="Pet Accessories">Pet Accessories</MenuItem>
            <MenuItem value="Pet Health and Grooming">
              Pet Health and Grooming
            </MenuItem>
          </Select>
          <TextField
            id="quantity"
            label="Quantity"
            name="quantity"
            className="w-full"
            variant="outlined"
            value={itemData.quantity}
            onChange={handleInputChange}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primaryAccent px-4 py-2 text-black font-medium uppercase hover:bg-primary"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default InventoryManagementCreateItemsPage;
