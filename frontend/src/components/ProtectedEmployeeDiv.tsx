import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import Cookies from "js-cookie";

import { handleAdminRouteNavigation } from "../routes/routes";

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
    if (context) {
      handleAdminRouteNavigation(context.employeeCredential.role, navigate);
    }
  }, [context?.employeeCredential]);

  return <div className={className}>{children}</div>;
}
