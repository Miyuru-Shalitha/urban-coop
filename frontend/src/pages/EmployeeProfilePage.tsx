import { useContext, useEffect, useState } from "react";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import { getEmployeeById } from "../services/employeeService";

export default function EmployeeProfilePage() {
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    if (context) {
      fetchEmployeeById(context?.employeeCredential._id);
    }
  }, []);

  const fetchEmployeeById = async (employeeId: string) => {
    const fechedEmployee = await getEmployeeById(employeeId);
    setEmployee(fechedEmployee);
  };

  return (
    <div className="my-4">
      <div
        className="bg-gray0 text-white w-60 h-60 rounded-full text-8xl
                        flex justify-center items-center"
      >
        <span>Z</span>
        {/* <img src="" alt="" /> */}
      </div>

      <div>
        <p>Employee ID: {employee?.employeeId}</p>
        <p>First Name: {employee?.firstName}</p>
        <p>Last Name: {employee?.lastName}</p>
        <p>Email: {employee?.email}</p>
        <p>Address: {employee?.address}</p>
        <p>Date Joined: {employee?.dateJoined}</p>
      </div>
    </div>
  );
}
