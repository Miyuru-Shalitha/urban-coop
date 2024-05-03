import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface EmployeeContextType {
  employeeCredential: Employee;
  setEmployeeCredential: Dispatch<SetStateAction<Employee>>;
}

export const EmployeeAuthContext = createContext<EmployeeContextType | null>(
  null
);

export default function EmployeeAuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [employeeCredential, setEmployeeCredential] = useState<Employee>({
    _id: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  return (
    <EmployeeAuthContext.Provider
      value={{ employeeCredential, setEmployeeCredential }}
    >
      {children}
    </EmployeeAuthContext.Provider>
  );
}
