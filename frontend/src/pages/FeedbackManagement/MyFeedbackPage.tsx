import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Feedback } from '../../types/Feedback';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const API_BASE_URL = 'http://localhost:5000/api';

const MyFeedbackPage: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/feedback`);
            console.log('API response:', response.data);

            if (response.data && Array.isArray(response.data.feedbacks)) {
                setFeedbacks(response.data.feedbacks);
            } else {
                console.error('Unexpected data format:', response.data);
                toast.error('Failed to fetch feedbacks due to unexpected data format.');
            }
        } catch (err) {
            console.error('Error fetching feedbacks:', err);
            toast.error('Failed to fetch feedbacks.');
        }
    };

    const handleDelete = async (feedbackId: string) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/feedback/${feedbackId}`);
            if (response.status === 200) {
                toast.success('Feedback deleted successfully!');
                setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
            } else {
                toast.error('Failed to delete feedback. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
            toast.error('An error occurred while deleting feedback. Please try again later.');
        }
    };

    const handleEdit = (feedback: Feedback) => {
        setEditingFeedback(feedback);
    };

    const handleFeedbackUpdate = async (updatedFeedback: Feedback) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/feedback/${updatedFeedback._id}`, updatedFeedback);
            if (response.status === 200) {
                toast.success('Feedback updated successfully!');
                setFeedbacks((prevFeedbacks) =>
                    prevFeedbacks.map((feedback) =>
                        feedback._id === updatedFeedback._id ? updatedFeedback : feedback
                    )
                );
                setEditingFeedback(null); // Close the modal after update
            } else {
                toast.error('Failed to update feedback. Please try again later.');
            }
        } catch (error) {
            console.error('Error updating feedback:', error);
            toast.error('An error occurred while updating feedback. Please try again later.');
        }
    };

    // Filter feedbacks based on the search query
    const filteredFeedbacks = feedbacks.filter((feedback) =>
        feedback.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8 font-sans mt-8 mb-8 border-[2px] rounded-[15px] w-4/5">
            <h2 className="text-2xl font-bold mb-6">My Feedbacks</h2>



            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search feedbacks..."
                    className="border px-2 py-1 rounded w-full max-w" 

                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Rating</th>
                            <th className="px-4 py-2">Service</th>
                            <th className="px-4 py-2">Comment</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td className="border px-4 py-2">{feedback.customer}</td>
                                <td className="border px-4 py-2">{feedback.rating}</td>
                                <td className="border px-4 py-2">{feedback.service}</td>
                                <td className="border px-4 py-2">{feedback.comment}</td>
                                <td className="border px-4 py-2 flex space-x-2">
                                    <button
                                        className="bg-primaryAccent text-black px-3 py-1 rounded"
                                        onClick={() => handleEdit(feedback)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-500"
                                        onClick={() => handleDelete(feedback._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for editing feedback */}
            {editingFeedback && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded shadow-md p-6 w-4/5 h-auto">
                        <h3 className="text-xl font-semibold mb-4">Edit Feedback</h3>

                        <div className="mb-4">
                            <TextField
                                id="customer"
                                label="Your Name"
                                name="customer"
                                variant="outlined"
                                type="text"
                                value={editingFeedback.customer}
                                onChange={(e) =>
                                    setEditingFeedback((prev: any) => ({
                                        ...prev!,
                                        customer: e.target.value,
                                    }))
                                }
                                className="w-full max-w"
                            />
                        </div>

                        <div className="mb-4">


                            <FormControl fullWidth>
                                <InputLabel id="rating-select-label">Rating</InputLabel>
                                <Select
                                    labelId="rating-select-label"
                                    id="rating-select"
                                    value={editingFeedback.rating}
                                    onChange={(e) =>
                                        setEditingFeedback((prev: any) => ({
                                            ...prev!,
                                            rating: Number(e.target.value),
                                        }))
                                    }
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

                        </div>
                        <div className="mb-4">

                            <FormControl fullWidth>
                                <InputLabel id="service-select-label">Service</InputLabel>
                                <Select
                                    labelId="service-select-label"
                                    id="service-select"
                                    value={editingFeedback.service}
                                    onChange={(e) =>
                                        setEditingFeedback((prev: any) => ({
                                            ...prev!,
                                            service: e.target.value,
                                        }))
                                    }
                                    label="service"
                                    name="service"
                                >
                                    <MenuItem value="Pet Daycare">Pet Daycare</MenuItem>
                                    <MenuItem value="Pet Events">Pet Events</MenuItem>
                                    <MenuItem value="Pet Adoptation">Pet Adoptation</MenuItem>
                                </Select>
                            </FormControl>
                        </div>



                        <div className="mb-4">
                            <TextField
                                id="comment"
                                name="comment"
                                label="Comment"
                                variant="outlined"
                                value={editingFeedback.comment}
                                onChange={(e) =>
                                    setEditingFeedback((prev: any) => ({
                                        ...prev!,
                                        comment: e.target.value,
                                    }))
                                }
                                className="w-full max-w"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-primaryAccent text-white px-4 py-2 rounded"
                                onClick={() => handleFeedbackUpdate(editingFeedback!)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setEditingFeedback(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFeedbackPage;
