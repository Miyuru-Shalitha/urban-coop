
import axios from 'axios';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const SupplierManagementUpdateSupplierPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    

    const [formState, setFormState] = useState({
        supplierId: '',
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        category: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/suppliers/${id}`);
                console.log(id);
                


                const data = response.data;

                console.log('Fetched and formatted data:', data);
                setFormState(data);
            } catch (error) {
                console.error('Error fetching update data:', error);
                toast.error('Failed to fetch update data.');
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
            console.log(formState);
            
            await axios.put(`http://localhost:5000/api/suppliers/${id}`, formState);
            toast.success('suppliers updated successfully!');
            navigate('/admin/supplier-management/suppliers');
        } catch (error) {
            console.error('Error updating suppliers:', error);
            toast.error('Failed to update suppliers.');
        }
    };

    return (
        <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
            <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
                <h1 className="text-2xl font-bold mb-6">Update Suppliers</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
                        <TextField
                            id="supplierId"
                            label="Supplier Id"
                            name="supplierId"
                            variant="outlined"
                            type="text"
                            value={formState.supplierId}
                            required
                            disabled={true}
                        />

                        <TextField
                            id="name"
                            label="Supplier Name"
                            name="name"
                            variant="outlined"
                            type="text"
                            value={formState.name}
                            required
                            onChange={handleInputChange}
                        />

                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            variant="outlined"
                            type="text"
                            value={formState.email}
                            required
                            onChange={handleInputChange}
                        />

                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            type="text"
                            value={formState.phoneNumber}
                            required
                            onChange={handleInputChange}
                        />

                        <TextField
                            id="address"
                            label="Address"
                            name="address"
                            variant="outlined"
                            type="text"
                            value={formState.address}
                            required
                            onChange={handleInputChange}
                        />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup
                                aria-label="category"
                                name="category"
                                value={formState.category}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="Pet Food" control={<Radio />} label="Pet Food" />
                                <FormControlLabel value="Medicine" control={<Radio />} label="Medicine" />
                                <FormControlLabel value="Grooming and Bathroom Essential" control={<Radio />} label="Grooming and Bathroom Essential" />
                                <FormControlLabel value="Pet Toys" control={<Radio />} label="Pet Toys" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    {/* Submit Button */}

                    <button className="bg-primaryAccent text-black px-4 py-2 rounded">
                        Update Details
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SupplierManagementUpdateSupplierPage;