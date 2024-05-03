import axios from "axios";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import FilledButton from "../../components/Common/FilledButton";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  // FormControlLabel,
  // FormLabel,
  InputLabel,
  MenuItem,
  // Radio,
  // RadioGroup,
  Select,
} from "@mui/material";

export default function SupplierManagementCreateSupplierPage() {
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState({
    supplierId: "",
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    category: "",
  });

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    // Basic form validation
    if (
      !supplierData.supplierId ||
      !supplierData.name ||
      !supplierData.phoneNumber ||
      !supplierData.email ||
      !supplierData.address ||
      !supplierData.category
    ) {
      toast.error("Please fill in all required fields.");

      return;
    }

    // Additional validation for email and phone number formats can be added here

    try {
      const response = await axios.post(
        "http://localhost:5000/api/suppliers/",
        supplierData
      );
      if (response.status === 201) {
        navigate("/admin/supplier-management/suppliers");
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
        <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
          <h1 className="text-2xl font-bold mb-6">Add Suppliars</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
              <TextField
                id="supplierId"
                label="Supplier Id"
                name="supplierId"
                variant="outlined"
                type="text"
                value={supplierData.supplierId}
                onChange={handleInputChange}
              />

              <TextField
                id="name"
                label="Suppliar Name"
                name="name"
                variant="outlined"
                type="text"
                value={supplierData.name}
                onChange={handleInputChange}
              />

              {/* Contact Number Field */}
              <TextField
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                type="email"
                value={supplierData.email}
                onChange={handleInputChange}
              />

              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={supplierData.phoneNumber}
                onChange={handleInputChange}
              />

              <TextField
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                value={supplierData.address}
                onChange={handleInputChange}
              />

              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={supplierData.category}
                  onChange={handleInputChange}
                  label="Category"
                  name="category"
                >
                  <MenuItem value="Pet Food">Pet Food</MenuItem>
                  <MenuItem value="Medicine">Medicine</MenuItem>
                  <MenuItem value="Grooming and Bathroom Essential">Grooming and Bathroom Essential</MenuItem>
                  <MenuItem value="Pet Toys">Pet Toys</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex ml-auto text-[15px] w rounded-[5px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
