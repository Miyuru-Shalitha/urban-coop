import { useContext, useEffect, useState } from "react";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import { getEmployeeById } from "../services/employeeService";
import InputField from "../components/Common/InputField";

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
        className="bg-gray0 text-white w-36 h-36 rounded-full text-7xl
                        flex justify-center items-center"
      >
        <span>{context?.employeeCredential.firstName[0]}</span>
        {/* <img src="" alt="" /> */}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <InputField
          type="text"
          label="Employee ID"
          value={employee?.employeeId}
        />
        <InputField
          type="text"
          label="First Name"
          value={employee?.firstName}
        />
        <InputField type="text" label="Last Name" value={employee?.lastName} />
        <InputField type="email" label="Email" value={employee?.email} />
        <InputField type="address" label="Address" value={employee?.address} />
        <InputField
          type="text"
          label="Date Joined"
          value={employee?.dateJoined}
        />
      </div>
    </div>
  );
}
