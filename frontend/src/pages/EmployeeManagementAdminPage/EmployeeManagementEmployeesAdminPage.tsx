import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  Employee,
  getEmployees,
  updateEmployee,
} from "../../services/employeeService";
import FilledButton from "../../components/Common/FilledButton";
import EmployeeCreationPopUp from "../../components/EmployeeCreationPopUp";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../../components/Common/Table";
import OutlinedButton from "../../components/Common/OutlinedButton";
import EmployeeUpdateProfile from "../../components/EmployeeUpdatePopUp";
import ProtectedEmployeeDiv from "../../components/ProtectedEmployeeDiv";
import { getRoleById, Role } from "../../services/roleService";

export default function EmployeeManagementEmployeesAdminPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<(Role | null)[]>([]);
  const [showEmployeeCreationPopUp, setShowEmployeeCreationPopUp] =
    useState(false);
  const [employeeIdForUpdating, setEmployeeIdForUpdating] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!showEmployeeCreationPopUp) {
      fetchEmployees();
    }
  }, [showEmployeeCreationPopUp, employeeIdForUpdating]);

  useEffect(() => {
    fetchRoles();
  }, [employees]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    const employees = await getEmployees();
    if (employees) {
      setEmployees(employees);
    }
    setIsLoading(false);
  };

  const fetchRoles = async () => {
    const employeeRolePromises = employees.map((employee) =>
      getRoleById(employee.roleId)
    );
    const employeeRoles = await Promise.all(employeeRolePromises);
    setRoles(employeeRoles);
  };

  const handleClickDeleteEmployee = async (id: string) => {
    const result = await deleteEmployeeById(id);

    if (result) {
      await fetchEmployees();
    }
  };

  const handleClickEditEmployee = async (id: string) => {
    setEmployeeIdForUpdating(id);
  };

  return (
    <ProtectedEmployeeDiv className="flex-1">
      {showEmployeeCreationPopUp && (
        <EmployeeCreationPopUp
          setIsVisible={setShowEmployeeCreationPopUp}
          fetchEmployee={fetchEmployees}
        />
      )}

      {!showEmployeeCreationPopUp && (
        <FilledButton
          onClick={() => setShowEmployeeCreationPopUp(true)}
          className="absolute right-4 bottom-6 text-base"
        >
          Add New Employee
        </FilledButton>
      )}

      {employeeIdForUpdating !== null && (
        <EmployeeUpdateProfile
          setEmployeeId={setEmployeeIdForUpdating}
          employeeId={employeeIdForUpdating!}
        />
      )}

      <div className="p-4 h-screen overflow-auto">
        <table className="border-2">
          <thead>
            <TableHeaderRow>
              <TableHeaderColumn>Employee ID</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Address</TableHeaderColumn>
              <TableHeaderColumn>Date Joined</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
              <TableHeaderColumn>Controls</TableHeaderColumn>
            </TableHeaderRow>
          </thead>

          <tbody>
            {employees.map((employee, index) => (
              <TableRow key={employee._id} rowIndex={index}>
                <TableColumn>{employee._id}</TableColumn>
                <TableColumn>{employee.firstName}</TableColumn>
                <TableColumn>{employee.lastName}</TableColumn>
                <TableColumn>{employee.email}</TableColumn>
                <TableColumn>{employee.address}</TableColumn>
                <TableColumn>{`${new Date(
                  employee.dateJoined
                ).getDay()} / ${new Date(
                  employee.dateJoined
                ).getMonth()} / ${new Date(
                  employee.dateJoined
                ).getFullYear()}`}</TableColumn>
                <TableColumn>{roles[index]?.name}</TableColumn>
                <TableColumn>
                  <div className="flex gap-2">
                    <OutlinedButton
                      className="text-sm"
                      onClick={() => handleClickEditEmployee(employee._id)}
                    >
                      Edit
                    </OutlinedButton>
                    <OutlinedButton
                      className="text-sm"
                      onClick={() => handleClickDeleteEmployee(employee._id)}
                    >
                      Delete
                    </OutlinedButton>
                  </div>
                </TableColumn>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedEmployeeDiv>
  );
}
