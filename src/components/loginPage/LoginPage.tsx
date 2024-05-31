import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:8000/auth/login",
        userData
      );

      console.log(response.data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error: any) {
      if (error.response.data.status === 404) {
        toast.error("User Not Found!", {
          position: "bottom-right",
        });
      }
      if (error.response.data.status === 400) {
        toast.error("Incorrect Password!", {
          position: "bottom-right",
        });
      }
      console.error(error.response.data);
    }
  };

  const handleSubmit = () => {
    handleLogin();
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center flex-row h-screen w-[97%]">
      <div className="flex flex-col justify-center items-center bg-slate-50/10 h-4/6 w-1/2 rounded-3xl">
        <div className=" flex flex-col w-9/12 m-1 relative">
          <p className="flex self-start text-white font-semibold text-3xl mx-2 mb-8 relative">
            login to studyspace
          </p>
          <p className="flex self-start text-white text-md mx-2 relative">
            username
          </p>
          <input
            className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[10px] m-2 text-black placeholder-black"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-md self-start text-white text-md mx-2">password</p>
          <input
            className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[10px] m-2 text-black placeholder-black"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="flex self-start text-white text-md mx-2">email</p>
          <input
            className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[10px] m-2 text-black placeholder-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="flex mx-2 my-4 px-3 py-1 items-center rounded-[10px] justify-center bg-[#F32FBC]"
            onClick={handleSubmit}
            disabled={username.length == 0 || password.length == 0}
          >
            log in
          </button>
          <div className="ml-2 mt-3 flex flex-row self-center underline underline-offset-4">
            <p className="text-white mr-1">Don't have an account?</p>
            <Link to="/signup" className="text-[#F32FBC]">
              Sign up here.
            </Link>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
