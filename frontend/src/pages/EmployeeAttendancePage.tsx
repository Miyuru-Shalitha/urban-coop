import { useEffect, useState } from "react";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../components/Common/Table";

export default function EmployeeAttendancePage() {
  const [dayCount, setDayCount] = useState(0);

  useEffect(() => {
    const year = 2024;
    const month = 4;
    const daysInMonth = getDaysInMonth(year, month);

    // console.log(`Number of days in ${year}-${month}: ${daysInMonth}`);
    setDayCount(daysInMonth);
  }, []);

  return (
    <div>
      <table className="border-2">
        <thead>
          <TableHeaderRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Sign In</TableHeaderColumn>
            <TableHeaderColumn>Sign Out</TableHeaderColumn>
            <TableHeaderColumn>Present</TableHeaderColumn>
          </TableHeaderRow>
        </thead>

        <tbody>
          <TableRow rowIndex={0}>
            <TableColumn>2024/04/05</TableColumn>
            <TableColumn>08:30 AM</TableColumn>
            <TableColumn>4:30 PM</TableColumn>
            <TableColumn>Present</TableColumn>
          </TableRow>

          <TableRow rowIndex={1}>
            <TableColumn>2024/04/06</TableColumn>
            <TableColumn>08:30 AM</TableColumn>
            <TableColumn>4:30 PM</TableColumn>
            <TableColumn>Present</TableColumn>
          </TableRow>

          <TableRow rowIndex={2}>
            <TableColumn>2024/04/07</TableColumn>
            <TableColumn>08:30 AM</TableColumn>
            <TableColumn>4:30 PM</TableColumn>
            <TableColumn>Absent</TableColumn>
          </TableRow>
        </tbody>
      </table>
    </div>
  );
}

function getDaysInMonth(year: any, month: any) {
  const date = new Date(year, month - 1, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
}
