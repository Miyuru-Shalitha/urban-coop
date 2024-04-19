import axios from "axios";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dateJoined: string;
  role: string;
}

const getEmployees = async (): Promise<Employee[] | null> => {
  try {
    const response = await axios.get("http://localhost:5000/api/employees");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    alert("Something went wrong!");
  }

  return null;
};

const createEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  roleId: string
): Promise<boolean> => {
  try {
    const response = await axios.post("http://localhost:5000/api/employees", {
      firstName,
      lastName,
      email,
      address,
      roleId,
    });

    if (response.status === 201) {
      return true;
    }
  } catch (error: any) {
    alert("Something went wrong!");
  }

  return false;
};

const deleteEmployeeById = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/api/employees/" + id
    );

    if (response.status === 204) {
      return true;
    }
  } catch (error: any) {
    alert("Something went wrong!");
  }

  return false;
};

export { type Employee, getEmployees, createEmployee, deleteEmployeeById };
