import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="bg-black text-white px-0 py-2 max-w-screen-xl">
            <div className="fixed justify-between items-center max-w-screen-xl mx-auto">
                {/* Logo */}
                <Link to="/" className="fixed top-3
                 left-8 text-3xl font-bold flex-shrink-0">Studyspace</Link>
                
                
                {/* Navigation Links */}
                <nav>
                    <ul className="flex justify-between space-x-5">
                        <Link to="/signup" className="fixed top-4 right-20 text-white">Signup</Link>
                        <Link to="/login" className="fixed top-4 right-6 text-white">Log in</Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
