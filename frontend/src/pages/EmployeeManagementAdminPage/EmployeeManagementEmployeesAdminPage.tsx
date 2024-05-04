import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
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
import InputField from "../../components/Common/InputField";
import { useNavigate } from "react-router-dom";

export default function EmployeeManagementEmployeesAdminPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [showEmployeeCreationPopUp, setShowEmployeeCreationPopUp] =
    useState(false);
  const [employeeIdForUpdating, setEmployeeIdForUpdating] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!showEmployeeCreationPopUp) {
      fetchEmployees();
    }
  }, [showEmployeeCreationPopUp, employeeIdForUpdating]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    const fetchedEmployees = await getEmployees();
    if (fetchedEmployees) {
      setEmployees(fetchedEmployees);
      setFilteredEmployees(fetchedEmployees);
    }
    setIsLoading(false);
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

  const handleSearch = (e: any) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setFilteredEmployees(employees);
      return;
    }

    console.log(employees);
    const filtered = employees.filter((employee) => {
      switch (e.target.value) {
        case employee.employeeId:
          return true;
        case employee.firstName:
          return true;
        case employee.lastName:
          return true;
        case employee.email:
          return true;
        case employee.address:
          return true;
        default:
          return false;
      }
    });

    setFilteredEmployees(filtered);
  };

  return (
    <div className="flex-1">
      <div className="p-4">
        <InputField
          label="Search by Employee ID, First Name, Last Name, Email or Address"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>

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
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee._id}
                rowIndex={index}
                // className="cursor-pointer hover:bg-primaryAccent transition-colors"
              >
                <TableColumn>{employee.employeeId}</TableColumn>
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
                <TableColumn>{employee.role.name}</TableColumn>
                <TableColumn>
                  <div className="flex gap-2">
                    <OutlinedButton
                      className="text-xs"
                      onClick={() => handleClickEditEmployee(employee._id)}
                    >
                      Edit
                    </OutlinedButton>
                    <OutlinedButton
                      className="text-xs"
                      onClick={() => handleClickDeleteEmployee(employee._id)}
                    >
                      Delete
                    </OutlinedButton>
                    <OutlinedButton
                      className="text-xs"
                      onClick={() => {
                        navigate("/admin/profile");
                      }}
                    >
                      Profile
                    </OutlinedButton>
                  </div>
                </TableColumn>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
