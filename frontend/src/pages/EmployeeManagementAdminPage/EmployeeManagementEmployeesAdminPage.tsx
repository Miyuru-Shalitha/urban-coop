import { ReactNode } from "react";

export default function EmployeeManagementEmployeesAdminPage() {
  return (
    <div className="p-16">
      <table className="border-2">
        <thead>
          <TableHeaderRow>
            <TableHeaderColumn text="Employee ID" />
            <TableHeaderColumn text="First Name" />
            <TableHeaderColumn text="Last Name" />
            <TableHeaderColumn text="Email" />
            <TableHeaderColumn text="Address" />
            <TableHeaderColumn text="Timestamp" />
          </TableHeaderRow>
        </thead>

        <tbody>
          <TableRow rowIndex={0}>
            <TableColumn text="UB12382" />
            <TableColumn text="David" />
            <TableColumn text="Jones" />
            <TableColumn text="david@test.com" />
            <TableColumn text="Some Address" />
            <TableColumn text="02/04/2024" />
          </TableRow>

          <TableRow rowIndex={1}>
            <TableColumn text="UB12382" />
            <TableColumn text="David" />
            <TableColumn text="Jones" />
            <TableColumn text="david@test.com" />
            <TableColumn text="Some Address" />
            <TableColumn text="02/04/2024" />
          </TableRow>

          <TableRow rowIndex={2}>
            <TableColumn text="UB12382" />
            <TableColumn text="David" />
            <TableColumn text="Jones" />
            <TableColumn text="david@test.com" />
            <TableColumn text="Some Address" />
            <TableColumn text="02/04/2024" />
          </TableRow>

          <TableRow rowIndex={3}>
            <TableColumn text="UB12382" />
            <TableColumn text="David" />
            <TableColumn text="Jones" />
            <TableColumn text="david@test.com" />
            <TableColumn text="Some Address" />
            <TableColumn text="02/04/2024" />
          </TableRow>

          <TableRow rowIndex={4}>
            <TableColumn text="UB12382" />
            <TableColumn text="David" />
            <TableColumn text="Jones" />
            <TableColumn text="david@test.com" />
            <TableColumn text="Some Address" />
            <TableColumn text="02/04/2024" />
          </TableRow>
        </tbody>
      </table>
    </div>
  );
}

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
    <tr className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray1"}>{children}</tr>
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
