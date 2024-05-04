import QRCode from "react-qr-code";

export default function EmployeeAttendanceSignInQR() {
  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value="http://localhost:3000/admin/employee-attendance/sign-in"
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}
