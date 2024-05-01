import { FormEvent, useContext, useEffect, useState } from "react";
import FilledButton from "../components/Common/FilledButton";
import InputField from "../components/Common/InputField";
import Footer from "../components/Footer/Footer";
import { logInEmployee } from "../services/employeeAuthService";
import { useNavigate } from "react-router-dom";
import { EmployeeAuthContext } from "../context/EmployeeAuthContextProvider";
import toast from "react-hot-toast";

export default function EmployeeLogInPage() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const context = useContext(EmployeeAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context?.employeeCredential.employeeId) {
      navigate("/admin");
    }
  }, [context?.employeeCredential.employeeId]);

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
        });
      }, 1200);
    } else {
      toast.error("Something went wrong!", { duration: 1000 });
    }
  };

  return (
    <div>
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
    </div>
  );
}
