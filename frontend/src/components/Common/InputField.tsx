import { HTMLInputTypeAttribute } from "react";

export default function InputField({
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
