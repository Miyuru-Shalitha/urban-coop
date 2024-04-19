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
    return null;
  }
};

export { type Role, getRoles };
