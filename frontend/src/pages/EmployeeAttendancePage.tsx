import { useContext, useEffect, useState } from "react";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import { getAttendance } from "../services/employeeAttendanceService";
import {
  TableColumn,
  TableHeaderColumn,
  TableHeaderRow,
  TableRow,
} from "../components/Common/Table";

export default function EmployeeAttendancePage() {
  const [days, setDays] = useState(0);
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (context) {
      fechAttendance(context.employeeCredential.employeeId);
    }
  }, [context?.employeeCredential.employeeId]);

  useEffect(() => {
    const year = 2024;
    const month = 6;
    const [daysInMonth, firstDay] = getDaysInMonth(year, month);

    // console.log(`Number of days in ${year}-${month}: ${daysInMonth}`);
    setDays(daysInMonth);
  }, []);

  const fechAttendance = async (employeeId: string) => {
    const fetchedAttendance = await getAttendance(employeeId);
    setAttendance(fetchedAttendance.attendance);
  };

  useEffect(() => {
    console.log(attendance);
  }, [attendance]);

  return (
    <div className="my-4">
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Sign In</TableHeaderColumn>
            <TableHeaderColumn>Sign Out</TableHeaderColumn>
            <TableHeaderColumn>Worked Hours</TableHeaderColumn>
          </TableHeaderRow>
        </thead>

        <tbody>
          {attendance.map((a: any, index) => {
            const workdedHours = 0;
            const [hours, minutes] = a.signIn.split(":");
            const timeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

            return (
              <TableRow key={index} rowIndex={index}>
                <TableColumn>{a.date}</TableColumn>
                <TableColumn>{a.signIn}</TableColumn>
                <TableColumn>{a.signOut}</TableColumn>
                <TableColumn>{(timeInMinutes / 60).toFixed()}</TableColumn>
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getDaysInMonth(year: any, month: any) {
  const date = new Date(year, month - 1, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return [date.getDate(), date.getDay()];
}
