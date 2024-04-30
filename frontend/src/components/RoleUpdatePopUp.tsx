import { FormEvent, useEffect, useState } from "react";
import InputField from "./Common/InputField";
import FilledButton from "./Common/FilledButton";
import OutlinedButton from "./Common/OutlinedButton";
import { getRoleById, Role, updateRole } from "../services/roleService";

export default function RoleUpdatePopUp({
  setRoleId,
  roleId,
}: {
  setRoleId: React.Dispatch<React.SetStateAction<string | null>>;
  roleId: string;
}) {
  const [role, setRole] = useState<Role>({
    _id: "",
    name: "",
    baseSalary: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const role = await getRoleById(roleId);
      if (role) {
        setRole(role);
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateRole(role._id, role.name, role.baseSalary);

    if (result) {
      setRoleId(null);
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
          label="Role ID"
          disabled={true}
          value={role._id}
        />
        <InputField
          type="text"
          label="Role"
          value={role.name}
          onChange={(e) => setRole({ ...role, name: e.target.value })}
        />
        <InputField
          type="number"
          label="Base Salary"
          value={role.baseSalary}
          onChange={(e) =>
            setRole({ ...role, baseSalary: parseFloat(e.target.value) })
          }
        />

        <div className="flex gap-2">
          <FilledButton className="text-base" type="submit">
            Save Changes
          </FilledButton>
          <OutlinedButton className="text-base" onClick={() => setRoleId(null)}>
            Cancel
          </OutlinedButton>
        </div>
      </form>
    </div>
  );
}
