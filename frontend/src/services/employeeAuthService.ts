import axios from "axios";

const authorizeEmployee = async () => {
  try {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employee-auth",
        { withCredentials: true }
      );

      if (response.status === 200) {
        return response.data.employee;
      }
    } catch (error: any) {
      console.error("Something went wrong!");
    }
  } catch (error: any) {
    console.error("Something went wrong!");
    alert("Something went wrong!");
  }
};

interface EmployeeCredentials {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const logInEmployee = async (
  email: string,
  password: string
): Promise<EmployeeCredentials | null> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/employee-auth",
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data.employee;
    }
  } catch (error: any) {
    console.error("Something went wrong!");
  }

  return null;
};

export { logInEmployee };
