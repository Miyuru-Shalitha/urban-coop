import { useEffect, useState } from "react";
import { Employee, getEmployees } from "../../services/employeeService";
import FilledButton from "../../components/Common/FilledButton";
import EmployeeCreationPopUp from "../../components/EmployeeCreationPopUp";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../../components/Common/Table";

export default function EmployeeManagementEmployeesAdminPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showEmployeeCreationPopUp, setShowEmployeeCreationPopUp] =
    useState(false);

  useEffect(() => {
    (async () => {
      setEmployees(await getEmployees());
    })();
  }, []);

  return (
    <div className="flex-1">
      {showEmployeeCreationPopUp && (
        <EmployeeCreationPopUp setIsVisible={setShowEmployeeCreationPopUp} />
      )}

      {!showEmployeeCreationPopUp && (
        <FilledButton
          onClick={() => setShowEmployeeCreationPopUp(true)}
          className="absolute right-4 bottom-6 text-base"
        >
          Add New Employee
        </FilledButton>
      )}

      <div className="p-4 h-screen overflow-auto">
        <table className="border-2">
          <thead>
            <TableHeaderRow>
              <TableHeaderColumn text="Employee ID" />
              <TableHeaderColumn text="First Name" />
              <TableHeaderColumn text="Last Name" />
              <TableHeaderColumn text="Email" />
              <TableHeaderColumn text="Address" />
              <TableHeaderColumn text="Date Joined" />
              <TableHeaderColumn text="Role" />
            </TableHeaderRow>
          </thead>

          <tbody>
            {employees.map((employee, index) => (
              <TableRow key={employee._id} rowIndex={index}>
                <TableColumn text={employee._id} />
                <TableColumn text={employee.firstName} />
                <TableColumn text={employee.lastName} />
                <TableColumn text={employee.email} />
                <TableColumn text={employee.address} />
                <TableColumn text={employee.dateJoined} />
                <TableColumn text={employee.role} />
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
