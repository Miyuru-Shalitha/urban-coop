import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export default function InputField({
  type,
  label,
  onChange,
  value,
  required,
  disabled,
}: {
  type: HTMLInputTypeAttribute;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value: string | number | readonly string[] | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
}) {
  return (
    <div className="relative">
      <input
        className="peer px-4 py-2 rounded focus:placeholder-transparent w-full border-2"
        type={type}
        placeholder={label}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
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
