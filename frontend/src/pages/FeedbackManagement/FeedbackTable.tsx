import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api/feedback'; // Adjust the URL as needed

const FeedbackTable: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    // Fetch all feedbacks on component mount
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setFeedbacks(response.data.feedbacks);
        } catch (err) {
            console.error('Error fetching feedbacks:', err);
            toast.error('Failed to fetch feedbacks.');
        }
    };

    const handleApprove = async (feedbackId: string) => {
        try {
            await axios.patch(`${API_BASE_URL}/${feedbackId}/approve`, { status: 'approved' });
            toast.success('Feedback approved successfully!');
            fetchFeedbacks(); // Refresh feedback list
        } catch (err) {
            console.error('Error approving feedback:', err);
            toast.error('Failed to approve feedback.');
        }
    };

    const handleDeny = async (feedbackId: string) => {
        try {
            await axios.patch(`${API_BASE_URL}/${feedbackId}/deny`, { status: 'denied' });
            toast.success('Feedback denied successfully!');
            fetchFeedbacks(); // Refresh feedback list
        } catch (err) {
            console.error('Error denying feedback:', err);
            toast.error('Failed to deny feedback.');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Admin Feedback Management</h2>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Rating</th>
                        <th className="px-4 py-2">Service</th>
                        <th className="px-4 py-2">Comment</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td className="border px-4 py-2">{feedback.customer}</td>
                            <td className="border px-4 py-2">{feedback.rating}</td>
                            <td className="border px-4 py-2">{feedback.service}</td>
                            <td className="border px-4 py-2">{feedback.comment}</td>
                            <td className="border px-4 py-2">{feedback.status}</td>
                            <td className="border px-4 py-2 flex space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleApprove(feedback._id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDeny(feedback._id)}
                                >
                                    Deny
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackTable;
