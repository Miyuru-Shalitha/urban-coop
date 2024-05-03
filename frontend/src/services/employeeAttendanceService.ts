import axios from "axios";

const markAttendance = async (
  employeeId: string,
  password: string,
  attendanceType: "sign-in" | "sign-out"
) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/employee-attendance",
      {
        employeeId,
        password,
        type: attendanceType,
      }
    );

    console.log("===============================");
    console.log(response.data);
    console.log("===============================");
  } catch (error: any) {
    alert("Something went wrong!");
  }
};

const getAttendance = async (employeeId: string): Promise<any> => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/employee-attendance/" + employeeId
    );

    if (response.status === 200) {
      return response.data;
    }

    alert("Something went wrong!");
  } catch (error: any) {
    alert("Something went wrong!");
  }
};

export { markAttendance, getAttendance };
