import { useEffect, useState } from "react";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../../components/Common/Table";
import { getRoles, Role } from "../../services/roleService";
// import FilledButton from "../../components/Common/FilledButton";

export default function EmployeeManagementRolesAdminPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedRoles = await getRoles();
      if (fetchedRoles) {
        setRoles(fetchedRoles);
      } else {
        alert("Something went wrong!");
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* <FilledButton className="absolute right-4 bottom-6 text-base">
        Create Roles
      </FilledButton> */}

      <div className="p-4 h-screen overflow-auto">
        {isLoading && <h1>LOADING...</h1>}
        <table className="border-2">
          <thead>
            <TableHeaderRow>
              <TableHeaderColumn>Role ID</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
              <TableHeaderColumn>Base Salary</TableHeaderColumn>
            </TableHeaderRow>
          </thead>

          <tbody>
            {roles.map((role, index) => (
              <TableRow key={role._id} rowIndex={index}>
                <TableColumn>{role._id}</TableColumn>
                <TableColumn>{role.name}</TableColumn>
                <TableColumn>{`Rs.${role.baseSalary.toString()}.00`}</TableColumn>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
