import { useEffect, useState } from "react";

export default function EmployeeAttendancePage() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const year = 2024;
    const month = 4;
    const daysInMonth = getDaysInMonth(year, month);

    // console.log(`Number of days in ${year}-${month}: ${daysInMonth}`);
    setDays(daysInMonth);
  }, []);

  return (
    <div className="my-4">
      <div className="bg-green-500">
        <div>DATE AND CONTROLS</div>
      </div>

      <div className="flex gap-1 text-primary mb-1">
        <Cell value="Monday" className="bg-secondary" />
        <Cell value="Tuesday" className="bg-secondary" />
        <Cell value="Wednesday" className="bg-secondary" />
        <Cell value="Thurseday" className="bg-secondary" />
        <Cell value="Friday" className="bg-secondary" />
        <Cell value="Saturday" className="bg-secondary" />
        <Cell value="Sunday" className="bg-secondary" />
      </div>

      <div className="flex gap-1 bg-white mb-1">
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
      </div>

      <div className="flex gap-1 bg-white mb-1">
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
      </div>

      <div className="flex gap-1 bg-white mb-1">
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
      </div>

      <div className="flex gap-1 bg-white mb-1">
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
      </div>

      <div className="flex gap-1 bg-white">
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
        <Cell value="CELL" className="bg-yellow-300" />
      </div>
    </div>
  );
}

function Cell({ value, className }: { value: string; className?: string }) {
  return (
    <div className="w-28 h-20 rounded">
      <div
        className={`rounded w-full h-full flex justify-center items-center ${className}`}
      >
        {value}
      </div>
    </div>
  );
}

function getDaysInMonth(year: any, month: any) {
  const date = new Date(year, month - 1, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
}
