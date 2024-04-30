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
    // Get user data from the Redux store
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
        let formErrors: { [key: string]: string } = {};

        // Validate customer name
        if (!formState.customerName) {
            valid = false;
            formErrors.customerName = "Customer name is required.";
        }

        // Validate email
        if (!formState.email) {
            valid = false;
            formErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            valid = false;
            formErrors.email = "Email format is invalid.";
        }

        // Validate description
        if (!formState.description) {
            valid = false;
            formErrors.description = "Description is required.";
        }

        // Validate start date
        if (!formState.startDate) {
            valid = false;
            formErrors.startDate = "Start date is required.";
        }

        // Validate end date
        if (!formState.endDate) {
            valid = false;
            formErrors.endDate = "End date is required.";
        } else if (new Date(formState.endDate) < new Date(formState.startDate)) {
            valid = false;
            formErrors.endDate = "End date cannot be before start date.";
        }

      // Validate contact number
if (!formState.contactNumber) {
  valid = false;
  formErrors.contactNumber = "Contact number is required.";
} else {
  let cleanedContactNumber = formState.contactNumber.replace(/[^0-9]/g, '').replace(/^0+/, '');

  if (cleanedContactNumber.length < 9) {
      valid = false;
      formErrors.contactNumber = "Contact number must contain at least 9 digits.";
  } else {
      const mobilePhoneCodes = ['70', '71', '72', '75', '76', '77', '78'];
      const last9 = cleanedContactNumber.slice(-9);

      if (
          (cleanedContactNumber.length === 9 && mobilePhoneCodes.includes(last9.slice(0, 2))) ||
          (cleanedContactNumber.length > 9 && cleanedContactNumber.startsWith('94') && mobilePhoneCodes.includes(last9.slice(0, 2)))
      ) {
      } else {
          valid = false;
          formErrors.contactNumber = "Invalid Sri Lankan mobile number.";
      }
  }
}


        // Validate pet name
        if (!formState.petName) {
            valid = false;
            formErrors.petName = "Pet name is required.";
        }

        // Validate pet type
        if (!formState.petType) {
            valid = false;
            formErrors.petType = "Pet type is required.";
        }

        // Set errors state
        setErrors(formErrors);

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
            const response = await axios.post("http://localhost:5000/api/bookings/", bookingData);
            
            // Check if response is successful
            if (response.status === 200) {
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
            } else {
                toast.error("Failed to create booking. Please try again.");
            }

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
                                label="Customer Name"
                                name="customerName"
                                variant="outlined"
                                type="text"
                                value={formState.customerName}
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
                                onChange={handleInputChange}
                                error={!!errors.contactNumber}
                                helperText={errors.contactNumber}
                            />

                            {/* Start Date Field */}
                            <TextField
                                label="Start Date"
                                name="startDate"
                                type="date"
                                id="startDate"
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
                                id="endDate"
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
                                {errors.petType && <div style={{ color: "red" }}>{errors.petType}</div>}
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
