import { ReactNode } from "react";

function TableHeaderRow({ children }: { children: ReactNode }) {
  return <tr className="bg-secondary">{children}</tr>;
}

function TableRow({
  children,
  rowIndex,
}: {
  children: ReactNode;
  rowIndex: number;
}) {
  return (
    <tr className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray0"}>{children}</tr>
  );
}

function TableHeaderColumn({ children }: { children: ReactNode }) {
  return (
    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
      {children}
    </th>
  );
}

function TableColumn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 whitespace-no-wrap ${className}`}>{children}</td>
  );
}

export { TableHeaderRow, TableRow, TableHeaderColumn, TableColumn };
