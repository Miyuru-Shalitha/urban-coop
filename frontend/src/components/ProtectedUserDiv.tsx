import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

// Define the ProtectedRoute component
function ProtectedUserDiv({ children }: { children: ReactNode }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Check if the user ID cookie (or any other authentication cookie) exists
    const userId = Cookies.get('userId');
    
    // If the user ID cookie does not exist, redirect to the login page
    if (!userId) {
      navigate('/login'); // Redirect to the login page
    }
  }, [navigate]);

  // Return the children if the user is authenticated
  return <>{children}</>;
}

export default ProtectedUserDiv;
