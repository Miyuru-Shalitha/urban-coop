import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";


export default function CreateFeedbackPage() {
    const navigate = useNavigate();
    const [feedbackData, setfeedbackData] = useState({
        customer: '',
        rating: '',
        service: '',
        comment: '',
        status:'pending',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setfeedbackData({ ...feedbackData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!feedbackData.customer || !feedbackData.rating || !feedbackData.service || !feedbackData.comment) {
            toast.error("Please fill in all required fields.");

            return;
        }

        // Additional validation for email and phone number formats can be added here

        try {
            const response = await axios.post("http://localhost:5000/api/feedback/", feedbackData);
            if (response.status === 201) {
                toast.success("Feedback added succesfully")
            }
        } catch (error) {
            console.error("Error creating Feedback:", error);
            toast.error("Something went wrong. Please try again.");

        }
    };

    return (

        <>
            <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
                <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
                    <h1 className="text-2xl font-bold mb-6">Add a Feedback</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">

                            <TextField
                                id="customer"
                                label="Your Name"
                                name="customer"
                                variant="outlined"
                                type="text"
                                value={feedbackData.customer}
                                onChange={handleInputChange}
                            />

                            <FormControl fullWidth>
                                <InputLabel id="rating-select-label">Rating</InputLabel>
                                <Select
                                    labelId="rating-select-label"
                                    id="rating-select"
                                    value={feedbackData.rating}
                                    onChange={handleInputChange}
                                    label="rating"
                                    name="rating"
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    

                                </Select>
                            </FormControl>


                            <FormControl fullWidth>
                                <InputLabel id="service-select-label">Service</InputLabel>
                                <Select
                                    labelId="service-select-label"
                                    id="service-select"
                                    value={feedbackData.service}
                                    onChange={handleInputChange}
                                    label="service"
                                    name="service"
                                >
                                    <MenuItem value="Pet Daycare">Pet Daycare</MenuItem>
                                    <MenuItem value="Pet Events">Pet Events</MenuItem>
                                    <MenuItem value="Pet Adoptation">Pet Adoptation</MenuItem>

                                    

                                </Select>
                            </FormControl>


                            <TextField
                                id="comment"
                                name="comment"
                                label="Comment"
                                variant="outlined"
                                value={feedbackData.comment}
                                onChange={handleInputChange}
                            />



                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="flex ml-auto text-[15px] w rounded-[5px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Add Feedback
                        </button>
                    </form>
                </div>
            </div>
        </>
    );


}
