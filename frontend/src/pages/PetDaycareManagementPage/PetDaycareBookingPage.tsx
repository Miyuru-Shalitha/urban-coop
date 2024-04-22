import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import toast from "react-hot-toast";

// Define the types
type TFormData = {
    cus_id: string;
    customerName: string;
    email: string;
    description: string;
    startDate: Date;
    endDate: Date;
    contactNumber: string;
    petName: string;
    petType: string;
};

function PetDaycareBookingPage() {
    // Get user data from the store
    const { user } = useSelector((state: RootState) => state.auth);

    // Initialize form state with the TFormData type
    const [formState, setFormState] = useState<TFormData>({
        cus_id: user._id,
        customerName: "",
        email: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        contactNumber: "",
        petName: "",
        petType: "",
    });

    // Initialize state for error messages
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Get the navigate function
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value,
        }));
    };

    // Validate form data
    const validateForm = (): boolean => {
        let valid = true;
        let errors: { [key: string]: string } = {};

        // Validate customer name
        if (!formState.customerName) {
            valid = false;
            errors.customerName = "Customer name is required.";
        }

        // Validate email
        if (!formState.email) {
            valid = false;
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            valid = false;
            errors.email = "Email format is invalid.";
        }

        // Validate description
        if (!formState.description) {
            valid = false;
            errors.description = "Description is required.";
        }

        // Validate start date
        if (!formState.startDate) {
            valid = false;
            errors.startDate = "Start date is required.";
        }

        // Validate end date
        if (!formState.endDate) {
            valid = false;
            errors.endDate = "End date is required.";
        }

        // Validate contact number
        if (!formState.contactNumber) {
            valid = false;
            errors.contactNumber = "Contact number is required.";
        } else if (!/^\d+$/.test(formState.contactNumber)) {
            valid = false;
            errors.contactNumber = "Contact number must contain only digits.";
        }

        // Validate pet name
        if (!formState.petName) {
            valid = false;
            errors.petName = "Pet name is required.";
        }

        // Validate pet type
        if (!formState.petType) {
            valid = false;
            errors.petType = "Pet type is required.";
        }

        // Set errors state
        setErrors(errors);

        // Return validation status
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form data
        const isValid = validateForm();
        if (!isValid) {
            toast.error("Please correct the highlighted errors.");
            return;
        }

        // Create booking data object
        const bookingData = {
            customerName: formState.customerName,
            email: formState.email,
            description: formState.description,
            startDate: formState.startDate,
            endDate: formState.endDate,
            contactNumber: formState.contactNumber,
            petName: formState.petName,
            petType: formState.petType,
        };

        try {
            // Send POST request to the backend API
            await axios.post("http://localhost:5000/api/bookings/", bookingData);
            toast.success("Booking created successfully!");

            // Reset the form state
            setFormState({
                cus_id: user._id,
                customerName: "",
                email: "",
                description: "",
                startDate: new Date(),
                endDate: new Date(),
                contactNumber: "",
                petName: "",
                petType: "",
            });

            // Redirect user to a different page if needed
            // navigate('/some-other-page');
        } catch (error) {
            console.error("Error creating booking:", error);
            toast.error("Something went wrong!");
        }
    };

    // Render the form
    return (
        <>
            <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
                <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">

                            {/* Customer Name Field */}
                            <TextField
                                id="customerName"
                                label="Name"
                                name="customerName"
                                variant="outlined"
                                type="text"
                                value={formState.customerName}
                                required
                                onChange={handleInputChange}
                                error={!!errors.customerName}
                                helperText={errors.customerName}
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
                                error={!!errors.email}
                                helperText={errors.email}
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
                                error={!!errors.contactNumber}
                                helperText={errors.contactNumber}
                            />

                            {/* Start Date Field */}
                            <TextField
                                label="Start Date"
                                name="startDate"
                                type="date"
                                id="start"
                                value={new Date(formState.startDate).toISOString().substr(0, 10)}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: new Date().toISOString().substr(0, 10) }}
                                onChange={handleInputChange}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                            />

                            {/* End Date Field */}
                            <TextField
                                label="End Date"
                                name="endDate"
                                type="date"
                                id="end"
                                value={new Date(formState.endDate).toISOString().substr(0, 10)}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: new Date().toISOString().substr(0, 10) }}
                                onChange={handleInputChange}
                                error={!!errors.endDate}
                                helperText={errors.endDate}
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
                                error={!!errors.petName}
                                helperText={errors.petName}
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
                                error={!!errors.description}
                                helperText={errors.description}
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

export default PetDaycareBookingPage;
