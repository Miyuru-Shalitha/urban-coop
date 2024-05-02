import { FormEvent, useContext, useState } from "react";
import FilledButton from "../components/Common/FilledButton";
import InputField from "../components/Common/InputField";
import Footer from "../components/Footer/Footer";
import { logInEmployee } from "../services/employeeAuthService";
import { EmployeeAuthContext } from "../context/EmployeeAuthContextProvider";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import ProtectedEmployeeDiv from "../components/ProtectedEmployeeDiv";

export default function EmployeeLogInPage() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const context = useContext(EmployeeAuthContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const employee = await logInEmployee(logInData.email, logInData.password);

    if (employee) {
      toast.success("Log in successful", { duration: 1000 });

      setTimeout(() => {
        context?.setEmployeeCredential({
          _id: employee._id,
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          role: employee.role,
        });
      }, 1200);

      Cookies.set("employee", JSON.stringify(employee));
    } else {
      toast.error("Something went wrong!", { duration: 1000 });
    }
  };

  return (
    <ProtectedEmployeeDiv>
      <div className="bg-surface h-screen flex justify-center items-center">
        <div className="bg-white w-1/3 border-2 p-12 rounded">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputField
              type="email"
              label="Email"
              value={logInData.email}
              onChange={(e) =>
                setLogInData({ ...logInData, email: e.target.value })
              }
            />
            <InputField
              type="password"
              label="Password"
              value={logInData.password}
              onChange={(e) =>
                setLogInData({ ...logInData, password: e.target.value })
              }
            />

            <FilledButton className="text-base w-full" type="submit">
              Log In
            </FilledButton>
          </form>
        </div>
      </div>

      <Footer />
    </ProtectedEmployeeDiv>
  );
}
