import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeManagementAdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate("/admin/employee-management/employees");
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div>EMPLOYEE MANAGEMENT ADMIN PAGE</div>
    </div>
  );
}
