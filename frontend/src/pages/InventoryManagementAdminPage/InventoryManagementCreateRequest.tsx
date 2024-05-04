import axios from "axios";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";

export default function StockManagementCreateStockPage() {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState({
    date: "",
    stockCode: "",
    stockBrand: "",
    category: "",
    quantity: 0,
    status: "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setStockData({ ...stockData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Basic form validation
    if (
      !stockData.date ||
      !stockData.stockCode ||
      !stockData.stockBrand ||
      !stockData.category ||
      !stockData.quantity ||
      !stockData.status
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Additional validation for quantity and status can be added here

    try {
      const response = await axios.post(
        "http://localhost:5000/api/stocks/",
        stockData
      );
      if (response.status === 201) {
        navigate("/admin/stock-management/stocks");
      }
    } catch (error) {
      console.error("Error creating stock:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
        <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
          <h1 className="text-2xl font-bold mb-6">Add Stock</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
              <TextField
                id="date"
                label="Date"
                name="date"
                variant="outlined"
                type="date"
                value={stockData.date}
                onChange={handleInputChange}
              />

              <TextField
                id="stockCode"
                label="Stock Code"
                name="stockCode"
                variant="outlined"
                type="text"
                value={stockData.stockCode}
                onChange={handleInputChange}
              />

              <TextField
                id="stockBrand"
                label="Stock Brand"
                name="stockBrand"
                variant="outlined"
                type="text"
                value={stockData.stockBrand}
                onChange={handleInputChange}
              />

              <TextField
                id="category"
                label="Category"
                name="category"
                variant="outlined"
                type="text"
                value={stockData.category}
                onChange={handleInputChange}
              />

              <TextField
                id="quantity"
                name="quantity"
                label="Quantity"
                variant="outlined"
                type="number"
                value={stockData.quantity}
                onChange={handleInputChange}
              />

              <TextField
                id="status"
                name="status"
                label="Status"
                variant="outlined"
                type="text"
                value={stockData.status}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex ml-auto text-[15px] w rounded-[5px]
               text-white bg-[#FF9F00] hover:bg-[#E38E00] 
               font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
