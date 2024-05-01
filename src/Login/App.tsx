import { useState } from "react";

export default function App() {
  const [newUser, setNewUser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    //If this is a new user
    if (newUser) {
    } else {
    }

    setUsername("");
    setPassword("");
  };

  //Top option is new user option, bottom option is login option
  return (
    <div className="flex justify-center items-center flex-row h-screen w-[97%]">
      <div className="flex flex-col justify-center items-center bg-slate-50 opacity-60 h-4/6 w-7/12 rounded-3xl">
        <input
          className="flex h-11 w-7/12 p-1 bg-slate-200 pl-3 rounded-[25px] m-2 text-black placeholder-black"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="flex h-11 w-7/12 p-1 bg-slate-200 pl-3 rounded-[25px] m-2 text-black placeholder-black"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col h-11 w-7/12 m-2">
          <button
            className="flex my-2 px-3 items-center justify-center self-start"
            onClick={handleLogin}
            disabled={username.length == 0 || password.length == 0}
          >
            {newUser ? "Create New Account" : "Login"}
          </button>
          <span
            className="self-start mt-3 underline underline-offset-4"
            onClick={() => setNewUser((current) => !current)}
          >
            {newUser ? "Existing user?" : "New user?"}
          </span>
        </div>
      </div>
    </div>
  );
}
