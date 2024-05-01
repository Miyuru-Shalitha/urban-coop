import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import Logo from '../../assets/UBLogoLogin.png';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState<string | null>(null);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend registration endpoint
      const response = await axios.post('http://localhost:5000/api/register', formData);

      // Handle successful registration
      toast.success("Registration successful! Welcome, Please Log-In");

      navigate('/user-login');
    } catch (error) {
      // Handle any errors during registration
      console.error('Registration failed:', error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Website Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-2xl mb-4">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          <div className="mb-4">
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>




          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
          >
            Register
          </Button>
        </form>
        {message && (
          <Typography variant="body1" color="primary" align="center" className="mt-4">
            {message}
          </Typography>
        )}
        <br />
        <Typography variant="body2" align="center" className="mt-4">
          Already have an account? <Link to="/user-login" className="text-blue-600 hover:underline">Log in</Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default RegisterPage;
