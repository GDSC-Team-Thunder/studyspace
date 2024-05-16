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
    <div className="flex justify-between items-center text-offWhite py-5 px-14 w-full">
      <Link to="/" className="text-3xl font-bold flex-shrink-0">
        studyspace
      </Link>
      <div className="flex justify-between space-x-10">
  {isLoggedIn ? (
    <>
      <Link to="/" className="font-bold">
        StudySpace
      </Link>
      <span className="font-bold">{username}</span>
      <button onClick={handleLogout} className="font-bold">
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/signup" className="font-bold">
        Sign Up
      </Link>
      <Link to="/login" className="font-bold">
        Log In
      </Link>
    </>
  )}
    </div>
    </div>
  );
}

export default Header;
