import axios from 'axios';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom'; 
import TextField from '@mui/material/TextField';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

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
    const [isLoading, setIsLoading] = useState(true); // Initialize as loading

    let hasShownApprovalError = false;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/${id}`);

                // If the booking is approved or denied, show error and navigate
                if (response.data.approvalStatuse === 'approved' || response.data.approvalStatuse === 'denied') {

                    if (!hasShownApprovalError) {
                        toast.error('Cannot edit approved or denied bookings');
                        hasShownApprovalError = true;
                        navigate('/userprofile/mybookings');
                    }
                }

                // Format dates
                const formatDate = (dateString: string | number | Date) => {
                    const date = new Date(dateString);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                };

                // Set formatted data to form state
                response.data.startDate = formatDate(response.data.startDate);
                response.data.endDate = formatDate(response.data.endDate);

                setFormState(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
                toast.error('Failed to fetch booking data.');
            } finally {
                setIsLoading(false); // Set loading state to false once data fetching is complete
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/bookings/online/${id}`, formState);
            toast.success('Booking updated successfully!');
            navigate('/mybookings');
        } catch (error) {
            console.error('Error updating booking:', error);
            toast.error('Failed to update booking.');
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div>
            {isLoading ? (
                // Display a simple loading message when loading
                <LoadingSpinner />
            ) : (
                <>
                    <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
                        <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">

                            <h1 className="text-2xl font-bold mb-6">Update Booking</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
                                    {/* Form fields */}
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

                                    <TextField
                                        label="Start Date"
                                        name="startDate"
                                        type="date"
                                        id="startDate"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: new Date().toISOString().substr(0, 10) }}
                                        value={formState.startDate}
                                        required
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        label="End Date"
                                        name="endDate"
                                        type="date"
                                        id="endDate"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: new Date().toISOString().substr(0, 10) }}
                                        value={formState.endDate}
                                        required
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        id="petName"
                                        name="petName"
                                        label="Pet Name"
                                        variant="outlined"
                                        value={formState.petName}
                                        required
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        variant="outlined"
                                        value={formState.description}
                                        required
                                        onChange={handleInputChange}
                                    />

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Pet Type</FormLabel>
                                        <RadioGroup
                                            aria-label="petType"
                                            name="petType"
                                            value={formState.petType}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value="Dog" control={<Radio />} label="Dog" />
                                            <FormControlLabel value="Cat" control={<Radio />} label="Cat" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                {/* Submit Button */}
                                <button className="bg-primaryAccent text-black px-4 py-2 rounded" type="submit">
                                    Update Booking
                                </button>
                            </form>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PetDaycareBookingUpdatePage;
