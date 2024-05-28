import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
    };

  return (
    <div className="flex justify-between items-center text-offWhite py-0 px-14 w-full">
      <Link to="/" className="text-5xl font-bold flex-shrink-0">
        studyspace
      </Link>
      <div className="flex justify-between space-x-10">
  {isLoggedIn ? (
    <>
      <span className="font-bold">{username}</span>
      <Link to="/" className="text-xl font-bold">
        Varun_Thakkar 
      </Link>
    </>
  ) : (
    <>
      <Link to="/signup" className="text-xl font-bold">
        Sign Up
      </Link>
      <Link to="/login" className="text-xl font-bold">
        Log In
      </Link>
    </>
  )}
    </div>
    </div>
  );
}

export default Header;
