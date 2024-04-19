import axios from "axios";

interface EmployeeCredentials {
  _id: string;
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
    alert("Something went wrong!");
  }

  return null;
};

export { logInEmployee };
