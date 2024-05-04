import { useContext, useEffect, useState } from "react";
import FilledButton from "../components/Common/FilledButton";
import {
  getAttendance,
  getHourlyRateByRoleName,
} from "../services/employeeAttendanceService";
import {
  EmployeeAuthContext,
  EmployeeContextType,
} from "../context/EmployeeAuthContextProvider";
import Cookies from "js-cookie";
import ReportComponent from "./EmployeeAttendanceAndSalaryReport";
import EmployeeAttendanceAndSalaryReport from "./EmployeeAttendanceAndSalaryReport";
import GenerateReportButton from "./EmployeeAttendanceAndSalaryReport";

export default function EmployeeAttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const context = useContext<EmployeeContextType | null>(EmployeeAuthContext);
  const [attendance, setAttendance] = useState([]);
  const [monthAttendance, setMonthAttendance] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    fetchAttendance();
    getHourlyRate();
  }, [context?.employeeCredential._id]);

  useEffect(() => {
    filterAttendance();
    calculateSalary();
  }, [currentDate]);

  const getHourlyRate = async () => {
    const employee = JSON.parse(Cookies.get("employee") ?? "");
    const rate = await getHourlyRateByRoleName(employee.role);
    setHourlyRate(rate);
  };

  const filterAttendance = async () => {
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const filteredAttendance = attendance.filter((a: any) => {
      const splittedDate = a.date.split("/");
      // const storedDate = parseInt(splittedDate[0]);
      const storedMonth = parseInt(splittedDate[1]);
      const storedYear = parseInt(splittedDate[2]);

      // console.log(date === storedDate);
      return month === storedMonth && year === storedYear;
    });

    setMonthAttendance(filteredAttendance);
  };

  const calculateSalary = () => {
    let totalMinutes = 0;

    monthAttendance.forEach((a: any) => {
      const signInTimeInMinutes = getTimeInMinutesFromTimeString(a.signIn);
      const signOutTimeOutMinutes = getTimeInMinutesFromTimeString(a.signOut);
      const workedTimeInMinutes = signOutTimeOutMinutes - signInTimeInMinutes;
      totalMinutes += workedTimeInMinutes;
    });

    const workedHours = totalMinutes / 60;
    const workedHoursFiexed: number = parseInt(workedHours.toFixed(0));
    setSalary(workedHoursFiexed * hourlyRate);
  };

  const getTimeInMinutesFromTimeString = (timeString: string) => {
    const splittedTime = timeString.split(":");
    const signInHours = parseInt(splittedTime[0]);
    const signInMinutes = parseInt(splittedTime[1]);
    const signInTimeInMinutes = signInHours * 60 + signInMinutes;

    return signInTimeInMinutes;
  };

  const fetchAttendance = async () => {
    if (context) {
      const attendance = await getAttendance(
        context.employeeCredential.employeeId
      );
      setAttendance(attendance.attendance);
    }
  };

  const moveToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(prevDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  const moveToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(prevDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const totalDaysInMonth = lastDayOfMonth.getDate();

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="text-center h-24 border border-gray-300 bg-yellow-100"
        ></div>
      );
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
      let signIn = "";
      let signOut = "";

      monthAttendance.forEach((a: any) => {
        const splittedCurrentDate = a.date.split("/");

        if (splittedCurrentDate[0] == i) {
          signIn = a.signIn;
          signOut = a.signOut;
        }
      });

      days.push(
        <div
          key={i}
          className="text-center h-24 border border-gray-300 flex items-center justify-center bg-yellow-300 rounded"
        >
          <div className="flex flex-col">
            <span>{i}</span>

            <span className="text-base">
              {signIn} - {signOut}
            </span>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-1/2 p-2 flex w-full">
      <div className="w-full mx-auto border rounded">
        <div className="flex justify-between p-2">
          <FilledButton onClick={moveToPreviousMonth} className="text-base">
            Previous Month
          </FilledButton>
          <h2 className="text-2xl">
            {currentDate.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <FilledButton onClick={moveToNextMonth} className="text-base">
            Next Month
          </FilledButton>
        </div>
        <div className="grid grid-cols-7 gap-1 text-2xl">
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Sun
          </div>
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Mon
          </div>
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Tue
          </div>
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Wed
          </div>
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Thu
          </div>
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Fri
          </div>
          <div className="text-center h-16 border border-gray-300 bg-secondary text-white rounded flex justify-center items-center">
            Sat
          </div>
          {generateCalendarDays()}
        </div>
      </div>

      <div className="px-2 flex flex-col gap-8 bg-white">
        <p>Salary: Rs.{salary}.00</p>
        {/* <FilledButton
          onClick={handleClickGenerateReport}
          className="text-base w-44"
        >
          <span>Generate Report</span>
        </FilledButton> */}
        <GenerateReportButton data={monthAttendance} />
      </div>
    </div>
  );
}
