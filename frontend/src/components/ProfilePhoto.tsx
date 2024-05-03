import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePhoto({ className }: { className?: string }) {
    // Initialize the navigate function using the useNavigate hook
    const navigate = useNavigate();

    // Create a click handler function to navigate to the profile layout
    const handleProfilePhotoClick = () => {
        // Navigate to the profile layout route
        navigate('/userprofile');
    };

    return (
        <div
            className={`text-white font-bold text-xl bg-gray1 w-12 h-12 
                flex justify-center items-center rounded-full border-2 border-primary ${className}`}
            onClick={handleProfilePhotoClick} // Attach the click handler function
        >
            <span>Z</span>
        </div>
    );
}

export default ProfilePhoto;
