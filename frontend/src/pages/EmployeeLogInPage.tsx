import { FormEvent, useEffect, useState } from "react";
import FilledButton from "../components/Common/FilledButton";
import InputField from "../components/Common/InputField";
import Footer from "../components/Footer/Footer";
import { logInEmployee } from "../services/employeeAuthService";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/employeeAuthSlice";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function EmployeeLogInPage() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const employeeAuthState = useSelector(
    (state: RootState) => state.employeeAuth.employee
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (employeeAuthState.isAuthenticated) {
      navigate("/admin");
    }
  }, [employeeAuthState]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const employee = await logInEmployee(logInData.email, logInData.password);

    if (employee) {
      dispatch(
        logIn({
          _id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
        })
      );
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
