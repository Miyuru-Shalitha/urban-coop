import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function FooterCard({ title, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 max-w-72">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </div>
  );
}
