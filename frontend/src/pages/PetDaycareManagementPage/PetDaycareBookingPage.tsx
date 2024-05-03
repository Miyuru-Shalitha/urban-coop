import { useEffect, useState } from "react";
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
    total: number;
    paymentStatus: string;
    approvalStatuse: string;
};

function PetDaycareBookingPage() {
    const { user } = useSelector((state: RootState) => state.auth);

    const [total, setTotal] = useState(0);

    const DOG_DAILY_RATE = 2000; // Daily rate for booking a dog
    const CAT_DAILY_RATE = 1000; // Daily rate for booking a cat



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
        total: total,
        paymentStatus: "Due",
        approvalStatuse: "Pending"

    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isDateValid, setIsDateValid] = useState(false);



    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value,
            total: total,

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
            errors.email = "Invalid email format.";
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

        // Validate date range
        if (new Date(formState.startDate) > new Date(formState.endDate)) {
            valid = false;
            errors.startDate = "Start date cannot be later than end date.";
            errors.endDate = "Start date cannot be later than end date.";

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


        console.log('Errors:', errors);

        // Set errors state
        setErrors(errors);

        // Return validation status
        return valid;
    };

    const calculateTotal = () => {
        const startDate = new Date(formState.startDate);
        const endDate = new Date(formState.endDate);

        if (startDate > endDate) {
            setIsDateValid(false);
            return;
        }

        setIsDateValid(true);

        // Calculate the difference in time (in milliseconds) and convert to days
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Determine the daily rate based on the pet type
        let dailyRate = 0;
        if (formState.petType === "Dog") {
            dailyRate = DOG_DAILY_RATE;
        } else if (formState.petType === "Cat") {
            dailyRate = CAT_DAILY_RATE;
        }

        // Calculate the total price
        const totalPrice = diffDays * dailyRate;

        // Format the total price to two decimal places and update the state
        setTotal(Number(totalPrice.toFixed(2)));
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
            total: formState.total,
            paymentStatus: formState.paymentStatus,
            approvalStatuse: formState.approvalStatuse,
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
                total: total,
                paymentStatus:"Due",
                approvalStatuse:"Pending"
            });

            // Redirect user to a different page if needed
            // navigate('/some-other-page');
        } catch (error) {
            console.error("Error creating booking:", error);
            toast.error("Something went wrong!");
        }
    };

    useEffect(() => {
        calculateTotal();
    }, [formState.startDate, formState.endDate, formState.petType]);

    useEffect(() => {
        setFormState((prevState) => ({
            ...prevState,
            total: total, // Update the total price in formState
        }));
    }, [total]);


    // Render the form
    return (
        <>
            <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
                <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
                <h1 className="text-2xl font-bold mb-6">Pet Daycare Booking</h1>

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
                                    <FormControlLabel value="Dog" control={<Radio />} label="Dog" />
                                    <FormControlLabel value="Cat" control={<Radio />} label="Cat" />
                                </RadioGroup>
                            </FormControl>

                            <div>
                                <label>Total estimated price: Rs</label>
                                <span> {total}</span> {/* Format total price to two decimal places */}
                            </div>

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