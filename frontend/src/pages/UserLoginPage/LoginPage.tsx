import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import Logo from '../../assets/UBLogoLogin.png';


type LoginFormData = {
    email: string;
    password: string;
};

function LoginPage() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Make a POST request to your backend's login endpoint
            const response = await axios.post('http://localhost:5000/api/', formData);

            // Handle successful login
            if (response.status === 200) {
                toast.success('Login successful!');
                // Redirect to the dashboard or other page
                // Navigate to another page or perform other actions
            } else {
                toast.error('Login failed!');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                {/* Website Logo */}
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Website Logo" className="h-12 w-auto" />
                </div>

                {/* Login Form */}
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        fullWidth
                        disabled={loading}
                        className="py-2"
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
