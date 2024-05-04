import { useContext } from "react";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";

export default function ProfilePhoto({ className }: { className?: string }) {
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);

  return (
    <div
      className={`text-white font-bold text-xl bg-gray1 w-12 h-12 
        flex justify-center items-center rounded-full border-2 border-primary ${className}`}
    >
      <span>{context?.employeeCredential.firstName[0]}</span>
    </div>
  );
}
