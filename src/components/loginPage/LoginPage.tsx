import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  //Top option is new user option, bottom option is login option
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
            onClick={handleLogin}
            disabled={username.length == 0 || password.length == 0}
          >
            log in
          </button>
          <div className="ml-2 mt-3 flex flex-row self-center underline underline-offset-4">
            <p className="text-white">Don't have an account?</p>
            <Link to="/signup" className="text-[#F32FBC]">
              Sign up here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
