import axios from "axios";

interface Role {
  _id: string;
  name: string;
  baseSalary: number;
}

const getRoles = async (): Promise<Role[] | null> => {
  try {
    const response = await axios.get("http://localhost:5000/api/roles");
    return response.data;
  } catch (error: any) {
    alert("Something went wrong!");
  }

  return null;
};

const getRoleById = async (roleId: string): Promise<Role | null> => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/roles/" + roleId
    );

    if (response.status === 200) {
      return response.data.role;
    }
  } catch (error: any) {
    alert("Something went wrong!");
  }

  return null;
};

const updateRole = async (
  id: string,
  name: string,
  baseSalary: number
): Promise<boolean> => {
  try {
    const response = await axios.put("http://localhost:5000/api/roles/" + id, {
      name,
      baseSalary,
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error: any) {
    alert("Something went wrong!");
  }

  return false;
};

export { type Role, getRoles, getRoleById, updateRole };
