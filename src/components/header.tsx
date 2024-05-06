import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="fixed justify-between items-center max-w-screen-xl mx-auto">
      <Link
        to="/"
        className="fixed top-3 left-8 text-3xl font-bold flex-shrink-0"
      >
        Studyspace
      </Link>

      <div className="flex justify-between space-x-5">
        <Link to="/signup" className="fixed top-4 right-20 text-white">
          Signup
        </Link>
        <Link to="/login" className="fixed top-4 right-6 text-white">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Header;
