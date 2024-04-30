import { FormEvent, useEffect, useState } from "react";
import { getRoles, Role } from "../services/roleService";
import InputField from "./Common/InputField";
import FilledButton from "./Common/FilledButton";
import OutlinedButton from "./Common/OutlinedButton";
import { getEmployeeById, updateEmployee } from "../services/employeeService";

export default function EmployeeUpdateProfile({
  setEmployeeId,
  employeeId,
}: {
  setEmployeeId: React.Dispatch<React.SetStateAction<string | null>>;
  employeeId: string;
}) {
  const [employeeData, setEmployeeData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dateJoined: "",
    roleId: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get roles
    (async () => {
      const fetchedRoles = await getRoles();
      if (fetchedRoles) {
        setRoles(fetchedRoles);
      } else {
        alert("Something went wrong!");
      }
    })();

    // Get employee by id
    (async () => {
      const employee = await getEmployeeById(employeeId);
      if (employee) {
        setEmployeeData({ ...employee });
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateEmployee(
      employeeId,
      employeeData.firstName,
      employeeData.lastName,
      employeeData.email,
      employeeData.address,
      employeeData.roleId
    );

    if (result) {
      setEmployeeId(null);
    }

    setIsLoading(false);
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
      <div className="absolute h-full w-full bg-grayAlpha1"></div>

      <form
        onSubmit={handleSubmit}
        className="absolute flex flex-col gap-2 bg-white px-16 py-16 rounded w-1/2"
      >
        <InputField
          type="text"
          label="Employee ID"
          disabled={true}
          value={employeeData._id}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, firstName: e.target.value })
          }
        />
        <InputField
          type="text"
          label="First Name"
          value={employeeData.firstName}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, firstName: e.target.value })
          }
        />
        <InputField
          type="text"
          label="Last Name"
          value={employeeData.lastName}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, lastName: e.target.value })
          }
        />
        <InputField
          type="email"
          label="Email"
          value={employeeData.email}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, email: e.target.value })
          }
        />
        <InputField
          type="text"
          label="Address"
          value={employeeData.address}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, address: e.target.value })
          }
        />

        <InputField
          type="text"
          label="Date Joined"
          disabled={true}
          value={`${new Date(employeeData.dateJoined).getDay()} / ${new Date(
            employeeData.dateJoined
          ).getMonth()} / ${new Date(employeeData.dateJoined).getFullYear()}`}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, dateJoined: e.target.value })
          }
        />

        <select
          value={employeeData.roleId}
          onChange={(e) =>
            setEmployeeData({ ...employeeData, roleId: e.target.value })
          }
        >
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <FilledButton className="text-base" type="submit">
            Save Changes
          </FilledButton>
          <OutlinedButton
            className="text-base"
            onClick={() => setEmployeeId(null)}
          >
            Cancel
          </OutlinedButton>
        </div>
      </form>
    </div>
  );
}
