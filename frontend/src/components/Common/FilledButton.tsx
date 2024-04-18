import { MouseEventHandler, ReactNode } from "react";

export default function FilledButton({
  children,
  className,
  type,
  onClick,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean | undefined;
}) {
  return (
    <button
      className={`bg-primary active:bg-primaryAccent disabled:bg-gray0 text-2xl py-1.5 px-8
        rounded-full self-start transition-colors ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
