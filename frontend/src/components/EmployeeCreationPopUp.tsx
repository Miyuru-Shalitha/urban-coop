import FilledButton from "./Common/FilledButton";
import InputField from "./Common/InputField";
import OutlinedButton from "./Common/OutlinedButton";

export default function EmployeeCreationPopUp({
  setIsVisible,
}: {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center">
      <div className="absolute h-full w-full bg-grayAlpha1"></div>

      <form className="absolute flex flex-col gap-2 bg-white px-16 py-16 rounded w-1/2">
        <InputField type="text" label="First Name" />
        <InputField type="text" label="Last Name" />
        <InputField type="email" label="Email" />
        <InputField type="text" label="Address" />
        {/* <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Address" />
        <input type="date" placeholder="Date Joined" /> */}

        <select>
          <option value="Employee Manager">Employee Manager</option>
          <option value="Employee Manager">Employee Manager</option>
          <option value="Employee Manager">Employee Manager</option>
          <option value="Employee Manager">Employee Manager</option>
          <option value="Employee Manager">Employee Manager</option>
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
