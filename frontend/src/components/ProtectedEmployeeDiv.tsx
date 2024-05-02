import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import Cookies from "js-cookie";

export default function ProtectedEmployeeDiv({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.employeeCredential.employeeId) {
      const employeeCookieString = Cookies.get("employee");

      if (employeeCookieString) {
        const employee = JSON.parse(employeeCookieString);
        context?.setEmployeeCredential({
          _id: employee._id,
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          role: employee.role.name,
        });
      } else {
        navigate("/admin/login");
      }
    }
  }, []);

  useEffect(() => {
    console.log(context?.employeeCredential);
    switch (context?.employeeCredential.role) {
      // case "Dary Care Manager":
      //   navigate("/admin/day-care-management");
      //   break;
      // case "Event Manager":
      //   navigate("/admin/event-management");
      //   break;
      // case "Supplier Manager":
      //   navigate("/admin/supplier-management");
      //   break;
      // case "Inventory Manager":
      //   navigate("/admin/inventory-management");
      //   break;
      // case "Feedback Manager":
      //   navigate("/admin/feedback-management");
      //   break;
      // case "Adoption Manager":
      //   navigate("/admin/event-management");
      //   break;
      // case "Finance Manager":
      //   navigate("/admin/finanace-management");
      //   break;
      case "Employee Manager":
        navigate("/admin/employee-management");
        break;
    }
  }, [context?.employeeCredential]);

  return <div className={className}>{children}</div>;
}
