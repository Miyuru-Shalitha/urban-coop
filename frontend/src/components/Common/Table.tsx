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

function TableHeaderColumn({ text }: { text: string }) {
  return (
    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
      {text}
    </th>
  );
}

function TableColumn({ text }: { text: string }) {
  return <td className="px-6 py-4 whitespace-no-wrap">{text}</td>;
}

export { TableHeaderRow, TableRow, TableHeaderColumn, TableColumn };
