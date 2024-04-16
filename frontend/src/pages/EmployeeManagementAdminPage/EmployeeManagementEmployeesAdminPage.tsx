import { ReactNode, useEffect, useState } from "react";
import { Employee, getEmployees } from "../../services/employeeService";
import FilledButton from "../../components/Common/FilledButton";
import EmployeeCreationPopUp from "../../components/EmployeeCreationPopUp";

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
    <div className="relative flex-1">
      {<EmployeeCreationPopUp />}

      {!showEmployeeCreationPopUp && (
        <FilledButton
          onClick={() => setShowEmployeeCreationPopUp(true)}
          className="absolute right-4 bottom-24 text-base"
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

function TableHeaderRow({ children }: { children: ReactNode }) {
  return <tr className="bg-secondary">{children}</tr>;
}

function TableRow({
  children,
  rowIndex,
}: {
  children: ReactNode;
  rowIndex: number;
}) {
  return (
    <tr className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray0"}>{children}</tr>
  );
}

function TableHeaderColumn({ text }: { text: string }) {
  return (
    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
      {text}
    </th>
  );
}

function TableColumn({ text }: { text: string }) {
  return <td className="px-6 py-4 whitespace-no-wrap">{text}</td>;
}
