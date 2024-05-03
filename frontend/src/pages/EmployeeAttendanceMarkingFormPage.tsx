import { FormEvent, useEffect, useState } from "react";
import InputField from "../components/Common/InputField";
import FilledButton from "../components/Common/FilledButton";
import { markAttendance } from "../services/employeeAttendanceService";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function EmployeeAttendanceMarkingFormPage() {
  const [attendanceFormDate, setAttendanceFormData] = useState({
    employeeId: "",
    password: "",
  });
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(true); // true -> attendance sign-in, false -> attendance sign-out

  useEffect(() => {
    const now = new Date();
    console.log(now.getHours());
    console.log(now.getMinutes());
  }, []);

  useEffect(() => {
    const splitedLocationArray = location.pathname.split("/");

    switch (splitedLocationArray[splitedLocationArray.length - 1]) {
      case "sign-in":
        setIsSignIn(true);
        break;

      case "sign-out":
        setIsSignIn(false);
        break;

      default:
        toast.error("Unknown pathname");
    }

    const now = new Date();
    console.log(now.getDate(), now.getMonth() + 1, now.getFullYear());
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markAttendance(
      attendanceFormDate.employeeId,
      attendanceFormDate.password,
      isSignIn ? "sign-in" : "sign-out"
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-surface">
      <div className="bg-white p-8 rounded">
        {isSignIn ? (
          <h2>Attendance (Sign In)</h2>
        ) : (
          <h2>Attendance (Sign Out)</h2>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            type="text"
            label="Employee ID"
            value={attendanceFormDate.employeeId}
            onChange={(e) =>
              setAttendanceFormData({
                ...attendanceFormDate,
                employeeId: e.target.value,
              })
            }
          />

          <InputField
            type="password"
            label="Password"
            value={attendanceFormDate.password}
            onChange={(e) =>
              setAttendanceFormData({
                ...attendanceFormDate,
                password: e.target.value,
              })
            }
          />

          <FilledButton className="text-base w-full" type="submit">
            Submit
          </FilledButton>
        </form>
      </div>
    </div>
  );
}
