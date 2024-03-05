import { useState } from "react";

export default function LoginPage() {
    const [newUser, setNewUser] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        //If this is a new user
        if (newUser) {

        }
        else {

        }

        setUsername("");
        setPassword("");
    }

    //Top option is new user option, bottom option is login option
    return (
        <div className="flex justify-center items-center flex-row h-screen w-[97%]">
            <div className="flex flex-col justify-center items-center bg-slate-50 opacity-60 h-4/6 w-1/2 rounded-3xl">
                <div className="flex flex-col w-9/12 m-1">
                    <p className="flex self-start font-semibold text-xl mx-2 mb-4">Log in to StudySpace</p>
                    <p className="flex self-start text-md mx-2">Username</p>
                    <input className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[25px] m-2 text-black placeholder-black" 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                    <p className="text-md self-start text-md mx-2">Password</p>
                    <input className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[25px] m-2 text-black placeholder-black"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <button className="flex m-2 px-3 items-center justify-center self-start" 
                        onClick={handleLogin}
                        disabled={username.length == 0 || password.length == 0}>{newUser ? "Create New Account" : "Login"}</button>
                    <span className="self-start mt-3 mx-2 underline underline-offset-4"
                        onClick={() => setNewUser(current => !current)}>{newUser ? "Existing user?" : "New user?"}</span>
                </div>
            </div>
        </div>
    );
}