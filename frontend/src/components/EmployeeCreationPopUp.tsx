import { FormEvent, useEffect, useState } from "react";
import FilledButton from "./Common/FilledButton";
import InputField from "./Common/InputField";
import OutlinedButton from "./Common/OutlinedButton";
import { getRoles, Role } from "../services/roleService";
import { createEmployee } from "../services/employeeService";

export default function EmployeeCreationPopUp({
  setIsVisible,
  fetchEmployee,
}: {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  fetchEmployee: () => Promise<void>;
}) {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    roleId: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedRoles = await getRoles();
      if (fetchedRoles) {
        setRoles(fetchedRoles);
        setEmployeeData({ ...employeeData, roleId: fetchedRoles[0]._id });
      } else {
        alert("Something went wrong!");
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await createEmployee(
      employeeData.firstName,
      employeeData.lastName,
      employeeData.email,
      employeeData.address,
      employeeData.roleId
    );
    if (result) {
      setIsVisible(false);
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
          <FilledButton className="text-base" onClick={() => {}} type="submit">
            Add Role
          </FilledButton>
          <OutlinedButton
            className="text-base"
            onClick={() => setIsVisible(false)}
          >
            Cancel
          </OutlinedButton>
        </div>
      </form>
    </div>
  );
}
