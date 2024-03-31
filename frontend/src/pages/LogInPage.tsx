import axios from "axios";
import { FormEvent, useState } from "react";

export default function LogInPage() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleClickLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth", {
        email: logInData.email,
        password: logInData.password,
      });
      console.log(response.data);
      alert(response.data.message);
    } catch (error: any) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="flex flex-col gap-4 bg-slate-500 px-10 py-8"
        onSubmit={handleClickLogIn}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setLogInData({ ...logInData, email: e.target.value })
          }
          value={logInData.email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLogInData({ ...logInData, password: e.target.value })
          }
          value={logInData.password}
        />
        <button
          className="bg-green-500 hover:bg-green-400 transition-colors"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}



