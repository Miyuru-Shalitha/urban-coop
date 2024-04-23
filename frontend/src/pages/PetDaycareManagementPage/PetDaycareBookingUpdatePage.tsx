import axios from 'axios';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 
import TextField from "@mui/material/TextField";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const PetDaycareBookingUpdatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formState, setFormState] = useState({
        customerName: '',
        email: '',
        contactNumber: '',
        description: '',
        startDate: '',
        endDate: '',
        petName: '',
        petType: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/${id}`);
                setFormState(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
                toast.error('Failed to fetch booking data.');
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/bookings/${id}`, formState);
            toast.success('Booking updated successfully!');
            navigate('/mybookings');
        } catch (error) {
            console.error('Error updating booking:', error);
            toast.error('Failed to update booking.');
        }
    };

    return (
        <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
            <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
            <h1 className="text-2xl font-bold mb-6">Update Booking</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
                        {/* Customer Name Field */}
                        <TextField
                            id="customerName"
                            label="Customer Name"
                            name="customerName"
                            variant="outlined"
                            type="text"
                            value={formState.customerName}
                            required
                            onChange={handleInputChange}
                        />

                        {/* Email Field */}
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            variant="outlined"
                            type="email"
                            value={formState.email}
                            required
                            onChange={handleInputChange}
                        />

                        {/* Contact Number Field */}
                        <TextField
                            id="contactNumber"
                            label="Contact Number"
                            name="contactNumber"
                            variant="outlined"
                            type="tel"
                            value={formState.contactNumber}
                            required
                            onChange={handleInputChange}
                        />

                        {/* Start Date Field */}
                        <TextField
                            label="Start Date"
                            name="startDate"
                            type="date"
                            id="startDate"
                            value={formState.startDate}
                            required
                            onChange={handleInputChange}
                        />

                        {/* End Date Field */}
                        <TextField
                            label="End Date"
                            name="endDate"
                            type="date"
                            id="endDate"
                            value={formState.endDate}
                            required
                            onChange={handleInputChange}
                        />

                        {/* Pet Name Field */}
                        <TextField
                            id="petName"
                            name="petName"
                            label="Pet Name"
                            variant="outlined"
                            value={formState.petName}
                            required
                            onChange={handleInputChange}
                        />

                        {/* Description Field */}
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            variant="outlined"
                            value={formState.description}
                            required
                            onChange={handleInputChange}
                        />

                        {/* Pet Type Radio Buttons */}
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Pet Type</FormLabel>
                            <RadioGroup
                                aria-label="petType"
                                name="petType"
                                value={formState.petType}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="dog" control={<Radio />} label="Dog" />
                                <FormControlLabel value="cat" control={<Radio />} label="Cat" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    {/* Submit Button */}

                    <button className="bg-primaryAccent text-black px-4 py-2 rounded">
                  Update Booking
                </button>

                </form>
            </div>
        </div>
    );
};

export default PetDaycareBookingUpdatePage;
