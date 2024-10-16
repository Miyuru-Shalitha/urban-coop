import { MouseEventHandler, ReactNode } from "react";

export default function OutlinedButton({
  children,
  className,
  type,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`border-2 border-primary active:bg-primaryAccent text-2xl py-1.5 px-8
        rounded-full self-start transition-colors ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
