import { useEffect, useState } from "react";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../../components/Common/Table";
import { getRoles, Role } from "../../services/employeeService";
import FilledButton from "../../components/Common/FilledButton";
import RoleCreationPopUp from "../../components/RolesCreationPopUp";

export default function EmployeeManagementRolesAdminPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showRoleCreationPopUp, setShowRoleCreationPopUp] = useState(false);

  useEffect(() => {
    (async () => {
      setRoles(await getRoles());
    })();
  }, []);

  return (
    <div>
      {showRoleCreationPopUp && (
        <RoleCreationPopUp setIsVisible={setShowRoleCreationPopUp} />
      )}

      {!showRoleCreationPopUp && (
        <FilledButton
          className="absolute right-4 bottom-6 text-base"
          onClick={() => setShowRoleCreationPopUp(true)}
        >
          Add New Role
        </FilledButton>
      )}

      <div className="p-4 h-screen overflow-auto">
        <table className="border-2">
          <thead>
            <TableHeaderRow>
              <TableHeaderColumn text="Role ID" />
              <TableHeaderColumn text="Role" />
              <TableHeaderColumn text="Base salary" />
              <TableHeaderColumn text="Timestamp" />
            </TableHeaderRow>
          </thead>

          <tbody>
            {roles.map((role, index) => (
              <TableRow key={role._id} rowIndex={index}>
                <TableColumn text={role._id} />
                <TableColumn text={role.role} />
                <TableColumn text={`Rs.${role.baseSalary.toString()}.00`} />
                <TableColumn text={role.timestamp} />
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
