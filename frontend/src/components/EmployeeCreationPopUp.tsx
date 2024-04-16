import { HTMLInputTypeAttribute } from "react";

export default function EmployeeCreationPopUp() {
  return (
    <div className="absolute h-full w-full flex justify-center items-center">
      <div className="absolute h-full w-full bg-grayAlpha1"></div>

      <form className="absolute flex flex-col gap-2 bg-white px-16 py-16 rounded w-1/2">
        <InputField type="text" label="First Name" />
        <InputField type="text" label="Last Name" />
        <InputField type="email" label="Email" />
        <InputField type="text" label="Address" />
        <InputField type="date" label="Date Joined" />
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
      </form>
    </div>
  );
}

function InputField({
  type,
  label,
}: {
  type: HTMLInputTypeAttribute;
  label: string;
}) {
  return (
    <div className="relative">
      <input
        className="peer px-4 py-2 rounded focus:placeholder-transparent w-full border-2"
        type={type}
        placeholder={label}
      />
      <label
        className="bg-white absolute invisible left-2 top-2 px-2
                peer-focus:visible peer-focus:left-2 peer-focus:-top-3 peer-focus:transition-all"
      >
        {label}
      </label>
    </div>
  );
}
