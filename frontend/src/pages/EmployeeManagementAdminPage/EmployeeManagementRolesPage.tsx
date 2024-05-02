import { useEffect, useState } from "react";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../../components/Common/Table";
import { getRoles, Role } from "../../services/roleService";
import OutlinedButton from "../../components/Common/OutlinedButton";
import RoleUpdatePopUp from "../../components/RoleUpdatePopUp";
import ProtectedEmployeeDiv from "../../components/ProtectedEmployeeDiv";
// import FilledButton from "../../components/Common/FilledButton";

export default function EmployeeManagementRolesAdminPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, [selectedRoleId]);

  const fetchRoles = async () => {
    setIsLoading(true);
    const fetchedRoles = await getRoles();

    if (fetchedRoles) {
      setRoles(fetchedRoles);
    } else {
      alert("Something went wrong!");
    }

    setIsLoading(false);
  };

  return (
    <div>
      {/* <FilledButton className="absolute right-4 bottom-6 text-base">
        Create Roles
      </FilledButton> */}

      {selectedRoleId && (
        <RoleUpdatePopUp
          roleId={selectedRoleId}
          setRoleId={setSelectedRoleId}
        />
      )}

      <div className="p-4 h-screen overflow-auto">
        {isLoading && <h1>LOADING...</h1>}
        <table className="border-2">
          <thead>
            <TableHeaderRow>
              <TableHeaderColumn>Role</TableHeaderColumn>
              <TableHeaderColumn>Base Salary</TableHeaderColumn>
              <TableHeaderColumn>Controls</TableHeaderColumn>
            </TableHeaderRow>
          </thead>

          <tbody>
            {roles.map((role, index) => (
              <TableRow key={role._id} rowIndex={index}>
                <TableColumn>{role.name}</TableColumn>
                <TableColumn>{`Rs.${role.baseSalary.toString()}.00`}</TableColumn>
                <TableColumn>
                  <OutlinedButton
                    className="text-base"
                    onClick={() => setSelectedRoleId(role._id)}
                  >
                    Edit
                  </OutlinedButton>
                </TableColumn>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
