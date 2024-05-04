import { useContext } from "react";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import { useNavigate } from "react-router-dom";

export default function ProfilePhoto({ className }: { className?: string }) {
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);
  const navigate = useNavigate();

  const handleProfilePhotoClick = () => {
    // Navigate to the profile layout route
    navigate("/userprofile");
  };

  return (
    <div
      onClick={handleProfilePhotoClick} // Attach the click handler function
      className={`text-white font-bold text-xl bg-gray1 w-12 h-12 
        flex justify-center items-center rounded-full border-2 border-primary ${className}`}
    >
      <span>{context?.employeeCredential.firstName[0]}</span>
    </div>
  );
}
