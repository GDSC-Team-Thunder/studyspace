const Header: any = () => {
    return (
        <header className="bg-black text-white px-0 py-2  max-w-screen-xl">
            <div className="relative justify-between items-center max-w-screen-xl mx-auto">
                {/* Logo */}
                <a href="#" className="relative left-5 text-4xl flex-shrink-0">StudySpace</a>
                
                {/* Navigation Links */}
                <nav>
                    <ul className="flex justify-between space-x-5">
                        <li><a href="#" className="relative top-4 right-30 text-white">Sign up</a></li>
                        <li><a href="#" className="relative top-4 right-20 text-white">Log in</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
