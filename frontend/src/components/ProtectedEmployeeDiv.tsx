import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function ProtectedEmployeeDiv({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const employeeAuthState = useSelector(
    (state: RootState) => state.employeeAuth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!employeeAuthState.employee.isAuthenticated) {
      navigate("/admin/login");
    }
  }, []);

  return <div className={className}>{children}</div>;
}
