import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function ProtectedDiv({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.user.isAuthenticated) {
      // navigate("/log-in");
    }
  }, []);

  return <div className={className}>{children}</div>;
}
