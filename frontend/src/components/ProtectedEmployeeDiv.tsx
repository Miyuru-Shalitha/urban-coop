import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";

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
      navigate("/admin/login");
    } else {
    }
  }, []);

  return <div className={className}>{children}</div>;
}
