import { useState } from "react";

export default function LoginPage() {
    const [newUser, setNewUser] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {      
        setUsername("");
        setEmail("");
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
                    <p className="flex self-start text-md mx-2">Email</p>
                    <input className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[25px] m-2 text-black placeholder-black" 
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <p className="text-md self-start text-md mx-2">Password</p>
                    <input className="flex h-11 p-1 bg-slate-200 pl-3 rounded-[25px] m-2 text-black placeholder-black"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    <button className="flex m-2 px-3 items-center justify-center self-start" 
                        onClick={handleLogin}
                        disabled={username.length == 0 || password.length == 0}>{newUser ? "Create New Account" : "Login"}</button>
                    <div className="ml-2 mt-3 flex flex-row underline underline-offset-4">
                        <p>{newUser ? "Already have an account?" : "Don't have an account?"}</p>{' '}
                        <b onClick={() => setNewUser(current => !current)}>{newUser ? "Log in here." : "Sign up here."}</b>
                    </div>
                </div>
            </div>
        </div>
    );
}